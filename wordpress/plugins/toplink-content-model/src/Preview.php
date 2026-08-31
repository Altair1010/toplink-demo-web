<?php

namespace Toplink\ContentModel;

final class Preview {
	public static function filter_link( string $preview_link, \WP_Post $post ): string {
		if ( ! in_array( $post->post_type, array( 'service', 'product', 'post' ), true ) || ! current_user_can( 'edit_post', $post->ID ) ) {
			return $preview_link;
		}
		$entry_url = self::entry_url();
		$payload = array(
			'post_type' => $post->post_type,
			'id'        => (int) $post->ID,
			'slug'      => $post->post_name,
			'exp'       => time() + IntegrationAuth::PREVIEW_TTL,
		);
		if ( 'post' === $post->post_type ) {
			$payload['article_type'] = PublicationGates::article_type( $post->ID );
		}
		$intent = IntegrationAuth::sign_preview_intent( $payload );
		return $entry_url && $intent ? add_query_arg( 'intent', $intent, $entry_url ) : $preview_link;
	}

	private static function entry_url(): string {
		$raw = trim( (string) getenv( 'TOPLINK_PREVIEW_WEB_URL' ) );
		$url = wp_parse_url( $raw );
		if ( ! is_array( $url ) || empty( $url['scheme'] ) || empty( $url['host'] ) ) {
			return '';
		}
		$scheme = strtolower( (string) $url['scheme'] );
		$host = strtolower( (string) $url['host'] );
		if ( 'https' !== $scheme && ! ( 'http' === $scheme && in_array( $host, array( '127.0.0.1', 'localhost' ), true ) ) ) {
			return '';
		}
		return esc_url_raw( $raw );
	}
}
