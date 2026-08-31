<?php

namespace Toplink\ContentModel;

use WP_Error;
use WP_Query;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;

final class RestApi {
	private const NAMESPACE = 'toplink/v1';

	public static function register_routes(): void {
		foreach ( array( 'services' => 'service', 'products' => 'product', 'articles' => 'post' ) as $route => $post_type ) {
			register_rest_route( self::NAMESPACE, '/' . $route, array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => static fn ( WP_REST_Request $request ) => self::collection( $post_type, $request ),
				'permission_callback' => '__return_true',
			) );
			register_rest_route( self::NAMESPACE, '/' . $route . '/(?P<slug>[a-z0-9-]+)', array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => static fn ( WP_REST_Request $request ) => self::detail( $post_type, sanitize_title( $request['slug'] ) ),
				'permission_callback' => '__return_true',
			) );
		}
		register_rest_route( self::NAMESPACE, '/media', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'media_collection' ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/media/(?P<id>\d+)', array( 'methods' => WP_REST_Server::READABLE, 'callback' => static fn ( WP_REST_Request $request ) => self::media_detail( absint( $request['id'] ) ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/site-settings', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'site_settings' ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/schema', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'schema' ), 'permission_callback' => '__return_true' ) );
	}

	public static function collection( string $post_type, WP_REST_Request $request ): WP_REST_Response {
		$args = array( 'post_type' => $post_type, 'post_status' => 'publish', 'posts_per_page' => 100, 'orderby' => array( 'menu_order' => 'ASC', 'date' => 'DESC' ), 'no_found_rows' => true );
		if ( 'post' === $post_type ) {
			$args['category_name'] = implode( ',', array_keys( SchemaRegistry::article_category_map() ) );
			$type = sanitize_key( (string) $request->get_param( 'type' ) );
			if ( $type && in_array( $type, SchemaRegistry::ARTICLE_TYPES, true ) ) {
				$slug = array_search( $type, SchemaRegistry::article_category_map(), true );
				$args['category_name'] = $slug;
			}
		}
		$query = new WP_Query( $args );
		$items = array();
		foreach ( $query->posts as $post ) {
			$projected = self::project_post( $post );
			if ( null !== $projected ) {
				$items[] = $projected;
			}
		}
		return new WP_REST_Response( array( 'items' => $items, 'count' => count( $items ) ), 200 );
	}

	public static function detail( string $post_type, string $slug ): WP_REST_Response|WP_Error {
		$posts = get_posts( array( 'name' => $slug, 'post_type' => $post_type, 'post_status' => 'publish', 'numberposts' => 1 ) );
		if ( ! $posts ) {
			return new WP_Error( 'toplink_not_found', 'Không tìm thấy nội dung publishable.', array( 'status' => 404 ) );
		}
		$item = self::project_post( $posts[0] );
		return null === $item ? new WP_Error( 'toplink_not_found', 'Không tìm thấy nội dung publishable.', array( 'status' => 404 ) ) : new WP_REST_Response( $item, 200 );
	}

	public static function media_collection(): WP_REST_Response {
		$attachments = get_posts( array( 'post_type' => 'attachment', 'post_status' => 'inherit', 'numberposts' => 100 ) );
		$items = array_values( array_filter( array_map( static fn ( \WP_Post $post ) => self::project_media( $post->ID ), $attachments ) ) );
		return new WP_REST_Response( array( 'items' => $items, 'count' => count( $items ) ), 200 );
	}

	public static function media_detail( int $attachment_id ): WP_REST_Response|WP_Error {
		$item = self::project_media( $attachment_id );
		return null === $item ? new WP_Error( 'toplink_media_not_found', 'Media không publishable.', array( 'status' => 404 ) ) : new WP_REST_Response( $item, 200 );
	}

	public static function site_settings(): WP_REST_Response|WP_Error {
		$values = (array) get_option( 'toplink_site_settings', array() );
		$states = (array) get_option( 'toplink_site_settings_governance', array() );
		$output = array();
		foreach ( SchemaRegistry::domains()['SiteSettings'] as $key => $definition ) {
			$state = (array) ( $states[ $key ] ?? array() );
			$value = $values[ $key ] ?? null;
			if ( 'APPROVED' === ( $state['status'] ?? 'PENDING' ) && '' !== trim( (string) ( $state['source'] ?? '' ) ) && ! self::empty_value( $value ) ) {
				$output[ $key ] = self::field_wrapper( $value, $definition['owner'], (string) $state['source'] );
			}
		}
		if ( ! isset( $output['public_display_name'] ) ) {
			return new WP_Error( 'toplink_settings_unpublishable', 'SiteSettings chưa có public_display_name được duyệt.', array( 'status' => 404 ) );
		}
		return new WP_REST_Response( $output, 200 );
	}

	public static function schema(): WP_REST_Response {
		$domains = array();
		foreach ( SchemaRegistry::domains() as $domain => $fields ) {
			$domains[ $domain ] = array();
			foreach ( $fields as $key => $definition ) {
				if ( $definition['rest'] ) {
					$domains[ $domain ][ $key ] = array_intersect_key( $definition, array_flip( array( 'storage', 'owner', 'required', 'type', 'enum' ) ) );
				}
			}
		}
		return new WP_REST_Response( array( 'version' => '1.0.0', 'domains' => $domains, 'omission' => 'Only approved values are emitted; non-approved optional values are absent.' ), 200 );
	}

	private static function project_post( \WP_Post $post ): ?array {
		if ( 'publish' !== $post->post_status || PublicationGates::validate( $post->ID ) ) {
			return null;
		}
		$fields = SchemaRegistry::fields_for_post_type( $post->post_type );
		$states = (array) get_post_meta( $post->ID, '_toplink_field_governance', true );
		$output = array();
		foreach ( $fields as $key => $definition ) {
			$value = PublicationGates::field_value( $post->ID, $post, null, $key, $definition );
			if ( ! empty( $definition['derived'] ) ) {
				$value = self::normalize_value( $key, $value, $definition, $post );
				if ( ! self::empty_value( $value ) ) {
					$output[ $key ] = self::field_wrapper( $value, $definition['owner'], 'WordPress core' );
				}
				continue;
			}
			$state = (array) ( $states[ $key ] ?? array() );
			if ( 'APPROVED' !== ( $state['status'] ?? 'PENDING' ) || '' === trim( (string) ( $state['source'] ?? '' ) ) ) {
				continue;
			}
			$value = self::normalize_value( $key, $value, $definition, $post );
			if ( ! self::empty_value( $value ) ) {
				$output[ $key ] = self::field_wrapper( $value, $definition['owner'], (string) $state['source'] );
			}
		}
		return $output;
	}

	private static function project_media( int $attachment_id ): ?array {
		if ( ! PublicationGates::media_is_publishable( $attachment_id ) ) {
			return null;
		}
		$post = get_post( $attachment_id );
		$states = (array) get_post_meta( $attachment_id, '_toplink_field_governance', true );
		$output = array();
		foreach ( SchemaRegistry::fields_for_post_type( 'attachment' ) as $key => $definition ) {
			$value = PublicationGates::field_value( $attachment_id, $post, null, $key, $definition );
			if ( 'asset' === $key ) {
				$metadata = wp_get_attachment_metadata( $attachment_id );
				$value = array( 'src' => $value, 'width' => (int) ( $metadata['width'] ?? 0 ), 'height' => (int) ( $metadata['height'] ?? 0 ) );
			}
			if ( 'caption' === $key && self::empty_value( $value ) ) {
				continue;
			}
			$state = ! empty( $definition['derived'] ) ? array( 'source' => 'WordPress core', 'status' => 'APPROVED' ) : (array) ( $states[ $key ] ?? array() );
			if ( 'APPROVED' === ( $state['status'] ?? 'PENDING' ) ) {
				$output[ $key ] = self::field_wrapper( $value, $definition['owner'], (string) $state['source'] );
			}
		}
		return $output;
	}

	private static function normalize_value( string $key, mixed $value, array $definition, \WP_Post $post ): mixed {
		if ( 'blocks' === $definition['type'] ) {
			return array_values( array_filter( array_map( 'trim', preg_split( '/\n\s*\n/', (string) $value ) ?: array() ) ) );
		}
		if ( 'integer' === $definition['type'] ) {
			return (int) $value;
		}
		if ( 'datetime' === $definition['type'] && $value ) {
			return mysql2date( DATE_ATOM, (string) $value, false );
		}
		if ( 'media' === $definition['type'] ) {
			return $value ? self::project_media( (int) $value ) : null;
		}
		if ( 'id_list' === $definition['type'] && 'media' === $key ) {
			return array_values( array_filter( array_map( static fn ( $id ) => self::project_media( (int) $id ), (array) $value ) ) );
		}
		if ( 'service_group' === $key && is_array( $value ) ) {
			return $value[0] ?? null;
		}
		unset( $post );
		return $value;
	}

	private static function field_wrapper( mixed $value, string $owner, string $source ): array {
		return array( 'value' => $value, 'owner' => $owner, 'source' => $source, 'status' => 'APPROVED' );
	}

	private static function empty_value( mixed $value ): bool {
		return null === $value || '' === trim( is_scalar( $value ) ? (string) $value : '' ) && empty( $value );
	}
}
