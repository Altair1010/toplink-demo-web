<?php

namespace Toplink\ContentModel;

final class PublicationGates {
	private static bool $checking = false;

	public static function guard_transition( array $data, array $postarr, array $unsanitized_postarr, bool $update ): array {
		unset( $unsanitized_postarr, $update );
		if ( self::$checking || 'publish' !== ( $data['post_status'] ?? '' ) || ! in_array( $data['post_type'] ?? '', array( 'service', 'product', 'post' ), true ) ) {
			return $data;
		}

		$post_id = absint( $postarr['ID'] ?? 0 );
		$errors  = self::validate( $post_id, $data );
		if ( ! self::current_user_can_publish( (string) $data['post_type'] ) ) {
			array_unshift( $errors, 'Vai trò hiện tại không có quyền publish loại nội dung này.' );
		}
		if ( $errors ) {
			$data['post_status'] = 'pending';
			self::store_notice( $errors );
		}
		return $data;
	}

	public static function validate( int $post_id, ?array $incoming = null ): array {
		$post = $post_id ? get_post( $post_id ) : null;
		$post_type = (string) ( $incoming['post_type'] ?? ( $post ? $post->post_type : '' ) );
		$fields = SchemaRegistry::fields_for_post_type( $post_type );
		if ( ! $fields ) {
			return array( 'Không tìm thấy schema Toplink cho record.' );
		}

		$errors = array();
		$lifecycle = (string) get_post_meta( $post_id, '_toplink_editorial_lifecycle', true );
		if ( ! in_array( $lifecycle, array( 'approved', 'published' ), true ) ) {
			$errors[] = 'editorial_lifecycle phải là approved trước khi publish.';
		}
		$governance = (array) get_post_meta( $post_id, '_toplink_field_governance', true );
		foreach ( $fields as $key => $definition ) {
			$value = self::field_value( $post_id, $post, $incoming, $key, $definition );
			if ( $definition['required'] && self::is_empty( $value, $key, $post_type ) ) {
				$errors[] = $key . ': thiếu giá trị bắt buộc.';
			}
			if ( ! empty( $definition['derived'] ) ) {
				continue;
			}
			$state = (array) ( $governance[ $key ] ?? array() );
			if ( $definition['required'] && 'APPROVED' !== ( $state['status'] ?? 'PENDING' ) ) {
				$errors[] = $key . ': FACT STATUS chưa APPROVED.';
			}
			if ( $definition['required'] && $definition['source_required'] && '' === trim( (string) ( $state['source'] ?? '' ) ) ) {
				$errors[] = $key . ': thiếu SOURCE.';
			}
		}

		if ( 'post' === $post_type && 'customer_story' === self::article_type( $post_id ) ) {
			foreach ( array( '_toplink_story_real', '_toplink_story_consent', '_toplink_story_context', '_toplink_story_identity_authorized', '_toplink_story_evidence_accepted' ) as $gate ) {
				if ( '1' !== (string) get_post_meta( $post_id, $gate, true ) ) {
					$errors[] = $gate . ': customer-story gate chưa đạt.';
				}
			}
		}
		return array_values( array_unique( $errors ) );
	}

	public static function mark_published( int $post_id, \WP_Post $post, bool $update ): void {
		unset( $update );
		if ( 'publish' === $post->post_status && in_array( $post->post_type, array( 'service', 'product', 'post' ), true ) && ! self::validate( $post_id ) ) {
			update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'published' );
		}
	}

	public static function enforce_published_state( int $post_id, \WP_Post $post, bool $update ): void {
		unset( $update );
		if ( self::$checking || 'publish' !== $post->post_status || ! in_array( $post->post_type, array( 'service', 'product', 'post' ), true ) ) {
			return;
		}
		$errors = self::validate( $post_id );
		if ( ! $errors ) {
			return;
		}
		self::$checking = true;
		wp_update_post( array( 'ID' => $post_id, 'post_status' => 'pending' ) );
		self::$checking = false;
		self::store_notice( $errors );
	}

	public static function media_is_publishable( int $attachment_id ): bool {
		$post = get_post( $attachment_id );
		if ( ! $post || 'attachment' !== $post->post_type ) {
			return false;
		}
		$governance = (array) get_post_meta( $attachment_id, '_toplink_field_governance', true );
		foreach ( SchemaRegistry::fields_for_post_type( 'attachment' ) as $key => $definition ) {
			$value = self::field_value( $attachment_id, $post, null, $key, $definition );
			if ( $definition['required'] && self::is_empty( $value, $key, 'attachment' ) ) {
				return false;
			}
			if ( empty( $definition['derived'] ) ) {
				$state = (array) ( $governance[ $key ] ?? array() );
				if ( 'APPROVED' !== ( $state['status'] ?? 'PENDING' ) || ( $definition['source_required'] && '' === trim( (string) ( $state['source'] ?? '' ) ) ) ) {
					return false;
				}
			}
		}
		if ( 'generic_stock' === get_post_meta( $attachment_id, 'identity_class', true ) && 'atmosphere' !== get_post_meta( $attachment_id, 'media_role', true ) ) {
			return false;
		}
		return true;
	}

	public static function article_type( int $post_id ): ?string {
		$slugs = wp_get_post_terms( $post_id, 'category', array( 'fields' => 'slugs' ) );
		if ( is_wp_error( $slugs ) ) {
			return null;
		}
		foreach ( SchemaRegistry::article_category_map() as $slug => $type ) {
			if ( in_array( $slug, $slugs, true ) ) {
				return $type;
			}
		}
		return null;
	}

	public static function render_notice(): void {
		$key = 'toplink_publish_errors_' . get_current_user_id();
		$errors = get_transient( $key );
		if ( ! is_array( $errors ) || ! $errors ) {
			return;
		}
		delete_transient( $key );
		echo '<div class="notice notice-error"><p><strong>Toplink chặn publication:</strong></p><ul>';
		foreach ( $errors as $error ) {
			echo '<li>' . esc_html( $error ) . '</li>';
		}
		echo '</ul></div>';
	}

	public static function field_value( int $post_id, ?\WP_Post $post, ?array $incoming, string $key, array $definition ): mixed {
		$storage = $definition['storage'];
		if ( str_starts_with( $storage, 'meta:' ) ) {
			return get_post_meta( $post_id, substr( $storage, 5 ), true );
		}
		if ( str_starts_with( $storage, 'taxonomy:' ) ) {
			$taxonomy = substr( $storage, 9 );
			return 'category' === $taxonomy ? self::article_type( $post_id ) : wp_get_post_terms( $post_id, $taxonomy, array( 'fields' => 'slugs' ) );
		}
		if ( 'featured_media' === $storage ) {
			return get_post_thumbnail_id( $post_id );
		}
		if ( 'attachment' === $storage ) {
			return wp_get_attachment_url( $post_id );
		}
		if ( 'post_author' === $storage ) {
			$user = get_user_by( 'id', (int) ( $incoming['post_author'] ?? ( $post ? $post->post_author : 0 ) ) );
			return $user ? $user->display_name : '';
		}
		if ( 'post_date' === $storage ) {
			return $incoming['post_date'] ?? ( $post ? $post->post_date : '' );
		}
		if ( 'post_modified' === $storage ) {
			return $post ? $post->post_modified : '';
		}
		if ( 'menu_order' === $storage ) {
			return (int) ( $incoming['menu_order'] ?? ( $post ? $post->menu_order : 0 ) );
		}
		return $incoming[ $storage ] ?? ( $post ? $post->{$storage} : '' );
	}

	private static function is_empty( mixed $value, string $key, string $post_type ): bool {
		if ( 'display_order' === $key && 'service' === $post_type ) {
			return false;
		}
		return null === $value || '' === trim( is_scalar( $value ) ? (string) $value : '' ) && empty( $value );
	}

	private static function current_user_can_publish( string $post_type ): bool {
		return match ( $post_type ) {
			'service' => current_user_can( 'publish_toplink_services' ),
			'product' => current_user_can( 'publish_toplink_products' ),
			default   => current_user_can( 'publish_posts' ),
		};
	}

	private static function store_notice( array $errors ): void {
		if ( get_current_user_id() ) {
			set_transient( 'toplink_publish_errors_' . get_current_user_id(), $errors, MINUTE_IN_SECONDS );
		}
	}
}
