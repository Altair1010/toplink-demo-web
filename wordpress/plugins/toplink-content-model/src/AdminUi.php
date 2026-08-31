<?php

namespace Toplink\ContentModel;

final class AdminUi {
	private const NONCE_ACTION = 'toplink_save_editorial_fields';
	private const NONCE_NAME   = 'toplink_editorial_nonce';

	public static function register(): void {
		foreach ( array( 'service', 'product', 'post', 'attachment' ) as $post_type ) {
			add_meta_box(
				'toplink-editorial-governance',
				'Toplink — nội dung và kiểm duyệt',
				array( self::class, 'render_meta_box' ),
				$post_type,
				'normal',
				'high'
			);
		}
		add_action( 'save_post', array( self::class, 'save_meta_box' ), 10, 2 );
		register_setting( 'toplink_settings', 'toplink_site_settings', array( 'type' => 'object', 'sanitize_callback' => array( self::class, 'sanitize_settings' ), 'default' => array() ) );
		register_setting( 'toplink_settings', 'toplink_site_settings_governance', array( 'type' => 'object', 'sanitize_callback' => array( self::class, 'sanitize_settings_governance' ), 'default' => array() ) );
		add_filter( 'option_page_capability_toplink_settings', static fn (): string => 'manage_toplink_settings' );
	}

	public static function render_meta_box( \WP_Post $post ): void {
		wp_nonce_field( self::NONCE_ACTION, self::NONCE_NAME );
		$fields     = SchemaRegistry::fields_for_post_type( $post->post_type );
		$governance = (array) get_post_meta( $post->ID, '_toplink_field_governance', true );
		$lifecycle  = (string) get_post_meta( $post->ID, '_toplink_editorial_lifecycle', true );
		$lifecycle  = in_array( $lifecycle, SchemaRegistry::LIFECYCLES, true ) ? $lifecycle : 'draft';

		$allowed_lifecycles = self::current_user_can_approve( $post->post_type ) ? SchemaRegistry::LIFECYCLES : array( 'draft', 'in_review' );
		echo '<p><strong>Vòng đời biên tập</strong><br><select name="toplink_lifecycle">';
		foreach ( $allowed_lifecycles as $value ) {
			printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $value ), selected( $lifecycle, $value, false ) );
		}
		echo '</select></p>';
		echo '<table class="widefat striped"><thead><tr><th>Trường</th><th>Giá trị bổ sung</th><th>OWNER</th><th>SOURCE</th><th>FACT STATUS</th></tr></thead><tbody>';
		foreach ( $fields as $key => $definition ) {
			$current = self::editable_value( $post, $definition );
			$state   = (array) ( $governance[ $key ] ?? array() );
			echo '<tr><td><code>' . esc_html( $key ) . '</code>' . ( $definition['required'] ? ' *' : '' ) . '</td><td>';
			if ( str_starts_with( $definition['storage'], 'meta:' ) ) {
				printf( '<textarea rows="3" class="large-text" name="toplink_value[%1$s]">%2$s</textarea>', esc_attr( $key ), esc_textarea( self::display_value( $current ) ) );
			} else {
				echo '<em>Dùng trường WordPress gốc</em>';
			}
			echo '</td><td>' . esc_html( $definition['owner'] ) . '</td><td>';
			if ( ! empty( $definition['derived'] ) ) {
				echo '<em>WordPress core (SYSTEM)</em>';
			} else {
				printf( '<input class="regular-text" name="toplink_source[%1$s]" value="%2$s">', esc_attr( $key ), esc_attr( (string) ( $state['source'] ?? '' ) ) );
			}
			echo '</td><td>';
			if ( ! empty( $definition['derived'] ) ) {
				echo '<em>APPROVED khi hệ thống tạo</em>';
			} else {
				printf( '<select name="toplink_status[%s]">', esc_attr( $key ) );
				$allowed_statuses = self::current_user_can_approve( $post->post_type ) ? SchemaRegistry::FACT_STATUSES : array( 'PENDING', 'REJECTED', 'REFERENCE_ONLY' );
				foreach ( $allowed_statuses as $status ) {
					printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $status ), selected( $state['status'] ?? 'PENDING', $status, false ) );
				}
				echo '</select>';
			}
			echo '</td></tr>';
		}
		echo '</tbody></table>';

		if ( 'post' === $post->post_type ) {
			echo '<h3>Gate câu chuyện khách hàng</h3><p>Chỉ dùng cho category <code>cau-chuyen-khach-hang</code>.</p>';
			foreach ( array(
				'_toplink_story_real'                => 'Bối cảnh câu chuyện có thật',
				'_toplink_story_consent'             => 'Đã ghi nhận đồng thuận',
				'_toplink_story_context'             => 'Bối cảnh và giới hạn được giữ nguyên',
				'_toplink_story_identity_authorized' => 'Danh tính/media đã được cho phép khi liên quan',
				'_toplink_story_evidence_accepted'   => 'Evidence/reference state được chấp nhận',
			) as $meta_key => $label ) {
				printf( '<label><input type="checkbox" name="toplink_story[%1$s]" value="1" %2$s> %3$s</label><br>', esc_attr( $meta_key ), checked( get_post_meta( $post->ID, $meta_key, true ), '1', false ), esc_html( $label ) );
			}
		}
	}

	public static function save_meta_box( int $post_id, \WP_Post $post ): void {
		$nonce = isset( $_POST[ self::NONCE_NAME ] ) ? sanitize_text_field( wp_unslash( $_POST[ self::NONCE_NAME ] ) ) : '';
		if ( ! wp_verify_nonce( $nonce, self::NONCE_ACTION ) || wp_is_post_autosave( $post_id ) || wp_is_post_revision( $post_id ) || ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		$lifecycle = isset( $_POST['toplink_lifecycle'] ) ? sanitize_key( wp_unslash( $_POST['toplink_lifecycle'] ) ) : 'draft';
		if ( in_array( $lifecycle, array( 'approved', 'published' ), true ) && ! self::current_user_can_approve( $post->post_type ) ) {
			$lifecycle = 'in_review';
		}
		if ( in_array( $lifecycle, SchemaRegistry::LIFECYCLES, true ) ) {
			update_post_meta( $post_id, '_toplink_editorial_lifecycle', $lifecycle );
		}

		$values   = isset( $_POST['toplink_value'] ) && is_array( $_POST['toplink_value'] ) ? wp_unslash( $_POST['toplink_value'] ) : array();
		$sources  = isset( $_POST['toplink_source'] ) && is_array( $_POST['toplink_source'] ) ? wp_unslash( $_POST['toplink_source'] ) : array();
		$statuses = isset( $_POST['toplink_status'] ) && is_array( $_POST['toplink_status'] ) ? wp_unslash( $_POST['toplink_status'] ) : array();
		$governance = array();
		foreach ( SchemaRegistry::fields_for_post_type( $post->post_type ) as $key => $definition ) {
			if ( str_starts_with( $definition['storage'], 'meta:' ) && array_key_exists( $key, $values ) ) {
				update_post_meta( $post_id, substr( $definition['storage'], 5 ), self::sanitize_value( $values[ $key ], $definition ) );
			}
			if ( empty( $definition['derived'] ) ) {
				$status = strtoupper( sanitize_key( $statuses[ $key ] ?? 'PENDING' ) );
				if ( 'APPROVED' === $status && ! self::current_user_can_approve( $post->post_type ) ) {
					$status = 'PENDING';
				}
				$governance[ $key ] = array(
					'source' => sanitize_textarea_field( $sources[ $key ] ?? '' ),
					'status' => in_array( $status, SchemaRegistry::FACT_STATUSES, true ) ? $status : 'PENDING',
				);
			}
		}
		update_post_meta( $post_id, '_toplink_field_governance', $governance );

		if ( 'post' === $post->post_type ) {
			$story = isset( $_POST['toplink_story'] ) && is_array( $_POST['toplink_story'] ) ? wp_unslash( $_POST['toplink_story'] ) : array();
			foreach ( array( '_toplink_story_real', '_toplink_story_consent', '_toplink_story_context', '_toplink_story_identity_authorized', '_toplink_story_evidence_accepted' ) as $meta_key ) {
				update_post_meta( $post_id, $meta_key, isset( $story[ $meta_key ] ) ? '1' : '0' );
			}
		}
	}

	public static function register_settings_page(): void {
		add_options_page( 'Toplink SiteSettings', 'Toplink SiteSettings', 'manage_toplink_settings', 'toplink-site-settings', array( self::class, 'render_settings_page' ) );
	}

	public static function render_settings_page(): void {
		if ( ! current_user_can( 'manage_toplink_settings' ) ) {
			wp_die( esc_html__( 'Bạn không có quyền truy cập.', 'toplink-content-model' ) );
		}
		$values = (array) get_option( 'toplink_site_settings', array() );
		$states = (array) get_option( 'toplink_site_settings_governance', array() );
		echo '<div class="wrap"><h1>Toplink SiteSettings</h1><p>Chỉ FACT STATUS = APPROVED với SOURCE hợp lệ mới xuất hiện trong REST công khai.</p><form method="post" action="options.php">';
		settings_fields( 'toplink_settings' );
		echo '<table class="widefat striped"><thead><tr><th>Trường</th><th>Giá trị</th><th>OWNER</th><th>SOURCE</th><th>FACT STATUS</th></tr></thead><tbody>';
		foreach ( SchemaRegistry::domains()['SiteSettings'] as $key => $definition ) {
			$state = (array) ( $states[ $key ] ?? array() );
			printf( '<tr><td><code>%1$s</code>%2$s</td><td><textarea class="large-text" rows="2" name="toplink_site_settings[%1$s]">%3$s</textarea></td><td>%4$s</td><td><input class="regular-text" name="toplink_site_settings_governance[%1$s][source]" value="%5$s"></td><td><select name="toplink_site_settings_governance[%1$s][status]">', esc_attr( $key ), $definition['required'] ? ' *' : '', esc_textarea( self::display_value( $values[ $key ] ?? '' ) ), esc_html( $definition['owner'] ), esc_attr( (string) ( $state['source'] ?? '' ) ) );
			foreach ( SchemaRegistry::FACT_STATUSES as $status ) {
				printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $status ), selected( $state['status'] ?? 'PENDING', $status, false ) );
			}
			echo '</select></td></tr>';
		}
		echo '</tbody></table>';
		submit_button();
		echo '</form></div>';
	}

	public static function sanitize_settings( mixed $input ): array {
		$output = array();
		foreach ( SchemaRegistry::domains()['SiteSettings'] as $key => $definition ) {
			$output[ $key ] = self::sanitize_value( is_array( $input ) ? ( $input[ $key ] ?? '' ) : '', $definition );
		}
		return $output;
	}

	public static function sanitize_settings_governance( mixed $input ): array {
		$output = array();
		foreach ( SchemaRegistry::domains()['SiteSettings'] as $key => $definition ) {
			$state  = is_array( $input ) ? (array) ( $input[ $key ] ?? array() ) : array();
			$status = strtoupper( sanitize_key( $state['status'] ?? 'PENDING' ) );
			$output[ $key ] = array(
				'source' => sanitize_textarea_field( $state['source'] ?? '' ),
				'status' => in_array( $status, SchemaRegistry::FACT_STATUSES, true ) ? $status : 'PENDING',
			);
		}
		return $output;
	}

	private static function editable_value( \WP_Post $post, array $definition ): mixed {
		return str_starts_with( $definition['storage'], 'meta:' ) ? get_post_meta( $post->ID, substr( $definition['storage'], 5 ), true ) : '';
	}

	private static function display_value( mixed $value ): string {
		return is_array( $value ) ? (string) wp_json_encode( $value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) : (string) $value;
	}

	private static function sanitize_value( mixed $value, array $definition ): mixed {
		$type = $definition['type'];
		if ( in_array( $type, array( 'string_list', 'id_list' ), true ) ) {
			$decoded = is_string( $value ) ? json_decode( $value, true ) : $value;
			$items = is_array( $decoded ) ? $decoded : preg_split( '/\r\n|\r|\n/', (string) $value );
			return 'id_list' === $type ? array_values( array_filter( array_map( 'absint', $items ) ) ) : array_values( array_filter( array_map( 'sanitize_text_field', $items ) ) );
		}
		if ( in_array( $type, array( 'faq', 'seo' ), true ) ) {
			$decoded = is_string( $value ) ? json_decode( $value, true ) : $value;
			return is_array( $decoded ) ? map_deep( $decoded, 'sanitize_text_field' ) : array();
		}
		$callback = is_callable( $definition['sanitize'] ) ? $definition['sanitize'] : 'sanitize_text_field';
		return call_user_func( $callback, (string) $value );
	}

	private static function current_user_can_approve( string $post_type ): bool {
		return match ( $post_type ) {
			'service' => current_user_can( 'publish_toplink_services' ),
			'product' => current_user_can( 'publish_toplink_products' ),
			default   => current_user_can( 'publish_posts' ),
		};
	}
}
