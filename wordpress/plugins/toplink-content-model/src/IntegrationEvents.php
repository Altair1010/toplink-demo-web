<?php

namespace Toplink\ContentModel;

final class IntegrationEvents {
	private static array $sent = array();

	public static function transition( string $new_status, string $old_status, \WP_Post $post ): void {
		if ( ! self::is_content_post( $post ) || $new_status === $old_status ) {
			return;
		}
		if ( 'publish' === $new_status && 'publish' !== $old_status ) {
			self::emit_post( 'content.published', $post );
		} elseif ( 'publish' === $old_status && 'publish' !== $new_status ) {
			self::emit_post( 'content.unpublished', $post );
		}
	}

	public static function updated( int $post_id, \WP_Post $after, \WP_Post $before ): void {
		unset( $post_id );
		if ( ! self::is_content_post( $after ) || 'publish' !== $after->post_status || 'publish' !== $before->post_status ) {
			return;
		}
		if ( $after->post_name !== $before->post_name ) {
			self::emit_post( 'content.slug_changed', $after, $before->post_name );
			return;
		}
		self::emit_post( 'content.updated', $after );
	}

	public static function before_delete( int $post_id, \WP_Post $post ): void {
		unset( $post_id );
		if ( self::is_content_post( $post ) && 'publish' === $post->post_status ) {
			self::emit_post( 'content.deleted', $post );
		} elseif ( 'attachment' === $post->post_type ) {
			self::emit_media( 'content.deleted', $post->ID );
		}
	}

	public static function attachment_updated( int $attachment_id ): void {
		self::emit_media( 'media.updated', $attachment_id );
	}

	public static function option_updated( string $option ): void {
		if ( in_array( $option, array( 'toplink_site_settings', 'toplink_site_settings_governance' ), true ) ) {
			self::emit(
				array(
					'event'  => 'settings.updated',
					'domain' => 'SiteSettings',
					'id'     => 0,
				)
			);
		}
	}

	private static function emit_post( string $event, \WP_Post $post, ?string $previous_slug = null ): void {
		$domain = SchemaRegistry::post_type_domain( $post->post_type );
		if ( ! $domain ) {
			return;
		}
		$payload = array(
			'event'  => $event,
			'domain' => $domain,
			'id'     => (int) $post->ID,
			'slug'   => $post->post_name,
		);
		if ( $previous_slug ) {
			$payload['previous_slug'] = $previous_slug;
		}
		if ( 'Article' === $domain ) {
			$payload['article_type'] = PublicationGates::article_type( $post->ID );
		}
		self::emit( $payload );
	}

	private static function emit_media( string $event, int $attachment_id ): void {
		self::emit(
			array(
				'event'        => $event,
				'domain'       => 'Media',
				'id'           => $attachment_id,
				'dependencies' => self::media_dependencies( $attachment_id ),
			)
		);
	}

	private static function media_dependencies( int $attachment_id ): array {
		$dependencies = array();
		$posts = get_posts( array( 'post_type' => array( 'service', 'product', 'post' ), 'post_status' => 'publish', 'numberposts' => -1 ) );
		foreach ( $posts as $post ) {
			$related = (array) get_post_meta( $post->ID, 'media', true );
			if ( ! in_array( $attachment_id, array_map( 'intval', $related ), true ) && (int) get_post_thumbnail_id( $post->ID ) !== $attachment_id ) {
				continue;
			}
			$dependency = array( 'domain' => SchemaRegistry::post_type_domain( $post->post_type ), 'slug' => $post->post_name );
			if ( 'post' === $post->post_type ) {
				$dependency['article_type'] = PublicationGates::article_type( $post->ID );
			}
			$dependencies[] = $dependency;
		}
		return $dependencies;
	}

	private static function emit( array $payload ): void {
		$url = self::webhook_url();
		$secret = trim( (string) getenv( 'TOPLINK_WEBHOOK_SECRET' ) );
		if ( ! $url || strlen( $secret ) < 32 ) {
			return;
		}
		$timestamp = time();
		$payload['timestamp'] = $timestamp;
		$key = implode( '|', array( $payload['event'], $payload['domain'], $payload['id'], $payload['slug'] ?? '' ) );
		if ( isset( self::$sent[ $key ] ) ) {
			return;
		}
		self::$sent[ $key ] = true;
		$body = wp_json_encode( $payload, JSON_UNESCAPED_SLASHES );
		$signature = hash_hmac( 'sha256', $timestamp . '.' . $body, $secret );
		$response = wp_remote_post(
			$url,
			array(
				'timeout' => 2,
				'headers' => array( 'Content-Type' => 'application/json', 'X-Toplink-Timestamp' => (string) $timestamp, 'X-Toplink-Signature' => $signature ),
				'body'    => $body,
			)
		);
		$code = is_wp_error( $response ) ? 0 : (int) wp_remote_retrieve_response_code( $response );
		if ( is_wp_error( $response ) || $code < 200 || $code >= 300 ) {
			error_log( sprintf( 'Toplink webhook event=%s domain=%s id=%d slug=%s result=failed status=%d', $payload['event'], $payload['domain'], $payload['id'], $payload['slug'] ?? '-', $code ) );
		}
	}

	private static function webhook_url(): string {
		$raw = trim( (string) getenv( 'TOPLINK_WEBHOOK_URL' ) );
		$url = wp_parse_url( $raw );
		if ( ! is_array( $url ) || empty( $url['scheme'] ) || empty( $url['host'] ) ) {
			return '';
		}
		$scheme = strtolower( (string) $url['scheme'] );
		$host = strtolower( (string) $url['host'] );
		if ( 'https' !== $scheme && ! ( 'http' === $scheme && in_array( $host, array( 'host.docker.internal', '127.0.0.1', 'localhost' ), true ) ) ) {
			return '';
		}
		return esc_url_raw( $raw );
	}

	private static function is_content_post( \WP_Post $post ): bool {
		return in_array( $post->post_type, array( 'service', 'product', 'post' ), true );
	}
}
