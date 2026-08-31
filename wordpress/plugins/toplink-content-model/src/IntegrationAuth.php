<?php

namespace Toplink\ContentModel;

final class IntegrationAuth {
	public const PREVIEW_TTL = 300;

	public static function preview_secret(): string {
		return trim( (string) getenv( 'TOPLINK_PREVIEW_SECRET' ) );
	}

	public static function sign_preview_intent( array $payload ): string {
		$secret = self::preview_secret();
		if ( '' === $secret ) {
			return '';
		}
		$payload['exp'] = min( (int) ( $payload['exp'] ?? 0 ), time() + self::PREVIEW_TTL );
		$encoded = self::base64url_encode( wp_json_encode( $payload ) );
		return $encoded . '.' . hash_hmac( 'sha256', $encoded, $secret );
	}

	public static function verify_preview_intent( string $intent ): ?array {
		$secret = self::preview_secret();
		if ( '' === $secret || ! str_contains( $intent, '.' ) ) {
			return null;
		}
		list( $encoded, $signature ) = explode( '.', $intent, 2 );
		$expected = hash_hmac( 'sha256', $encoded, $secret );
		if ( ! hash_equals( $expected, $signature ) ) {
			return null;
		}
		$decoded = self::base64url_decode( $encoded );
		$payload = json_decode( $decoded, true );
		$expires = is_array( $payload ) ? (int) ( $payload['exp'] ?? 0 ) : 0;
		if ( ! is_array( $payload ) || $expires < time() || $expires > time() + self::PREVIEW_TTL ) {
			return null;
		}
		return $payload;
	}

	private static function base64url_encode( string $value ): string {
		return rtrim( strtr( base64_encode( $value ), '+/', '-_' ), '=' );
	}

	private static function base64url_decode( string $value ): string {
		$padding = strlen( $value ) % 4;
		if ( $padding ) {
			$value .= str_repeat( '=', 4 - $padding );
		}
		$decoded = base64_decode( strtr( $value, '-_', '+/' ), true );
		return false === $decoded ? '' : $decoded;
	}
}
