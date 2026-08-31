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
		register_rest_route( self::NAMESPACE, '/redirects/(?P<resource>services|products|articles)/(?P<slug>[a-z0-9-]+)', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'redirect_detail' ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/preview/(?P<post_type>service|product|post)/(?P<id>\d+)', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'preview_detail' ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/site-settings', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'site_settings' ), 'permission_callback' => '__return_true' ) );
		register_rest_route( self::NAMESPACE, '/schema', array( 'methods' => WP_REST_Server::READABLE, 'callback' => array( self::class, 'schema' ), 'permission_callback' => '__return_true' ) );
	}

	public static function collection( string $post_type, WP_REST_Request $request ): WP_REST_Response {
		$page = max( 1, absint( $request->get_param( 'page' ) ?: 1 ) );
		$per_page = min( 100, max( 1, absint( $request->get_param( 'per_page' ) ?: 20 ) ) );
		$args = array( 'post_type' => $post_type, 'post_status' => 'publish', 'posts_per_page' => $per_page, 'paged' => $page, 'orderby' => array( 'menu_order' => 'ASC', 'date' => 'DESC' ), 'no_found_rows' => false );
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
		$total_pages = (int) $query->max_num_pages;
		return new WP_REST_Response(
			array(
				'items'      => $items,
				'count'      => count( $items ),
				'pagination' => array(
					'page'        => $page,
					'per_page'    => $per_page,
					'total_items' => (int) $query->found_posts,
					'total_pages' => $total_pages,
					'next_page'   => $page < $total_pages ? $page + 1 : null,
				),
			),
			200
		);
	}

	public static function detail( string $post_type, string $slug ): WP_REST_Response|WP_Error {
		$posts = get_posts( array( 'name' => $slug, 'post_type' => $post_type, 'post_status' => 'publish', 'numberposts' => 1 ) );
		if ( ! $posts ) {
			return new WP_Error( 'toplink_not_found', 'Không tìm thấy nội dung publishable.', array( 'status' => 404 ) );
		}
		$item = self::project_post( $posts[0] );
		return null === $item ? new WP_Error( 'toplink_not_found', 'Không tìm thấy nội dung publishable.', array( 'status' => 404 ) ) : new WP_REST_Response( $item, 200 );
	}

	public static function media_collection( WP_REST_Request $request ): WP_REST_Response {
		$page = max( 1, absint( $request->get_param( 'page' ) ?: 1 ) );
		$per_page = min( 100, max( 1, absint( $request->get_param( 'per_page' ) ?: 20 ) ) );
		$query = new WP_Query( array( 'post_type' => 'attachment', 'post_status' => 'inherit', 'posts_per_page' => $per_page, 'paged' => $page, 'no_found_rows' => false ) );
		$items = array_values( array_filter( array_map( static fn ( \WP_Post $post ) => self::project_media( $post->ID ), $query->posts ) ) );
		$total_pages = (int) $query->max_num_pages;
		return new WP_REST_Response(
			array(
				'items' => $items,
				'count' => count( $items ),
				'pagination' => array( 'page' => $page, 'per_page' => $per_page, 'total_items' => (int) $query->found_posts, 'total_pages' => $total_pages, 'next_page' => $page < $total_pages ? $page + 1 : null ),
			),
			200
		);
	}

	public static function redirect_detail( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$resource = sanitize_key( (string) $request['resource'] );
		$post_type = array( 'services' => 'service', 'products' => 'product', 'articles' => 'post' )[ $resource ] ?? '';
		$slug = sanitize_title( (string) $request['slug'] );
		$posts = get_posts( array( 'post_type' => $post_type, 'post_status' => 'publish', 'numberposts' => 1, 'orderby' => 'modified', 'order' => 'DESC', 'meta_key' => '_wp_old_slug', 'meta_value' => $slug ) );
		if ( ! $posts || null === self::project_post( $posts[0] ) ) {
			return new WP_Error( 'toplink_redirect_not_found', 'Không tìm thấy canonical redirect.', array( 'status' => 404 ) );
		}
		$current_slug = $posts[0]->post_name;
		$base = match ( $post_type ) {
			'service' => '/dich-vu/',
			'product' => '/san-pham/',
			default => 'knowledge' === PublicationGates::article_type( $posts[0]->ID ) ? '/kien-thuc/' : '/tin-tuc/',
		};
		return new WP_REST_Response( array( 'slug' => $current_slug, 'path' => $base . $current_slug ), 200 );
	}

	public static function preview_detail( WP_REST_Request $request ): WP_REST_Response|WP_Error {
		$intent = trim( (string) $request->get_header( 'x-toplink-preview-intent' ) );
		if ( '' === $intent ) {
			return new WP_Error( 'toplink_preview_unauthorized', 'Thiếu preview intent.', array( 'status' => 401 ) );
		}
		$payload = IntegrationAuth::verify_preview_intent( $intent );
		$post_type = sanitize_key( (string) $request['post_type'] );
		$post_id = absint( $request['id'] );
		if ( ! $payload || $post_type !== ( $payload['post_type'] ?? '' ) || $post_id !== (int) ( $payload['id'] ?? 0 ) ) {
			return new WP_Error( 'toplink_preview_unauthorized', 'Preview intent không hợp lệ.', array( 'status' => 401 ) );
		}
		$post = get_post( $post_id );
		$article_type_matches = 'post' !== $post_type || PublicationGates::article_type( $post_id ) === ( $payload['article_type'] ?? '' );
		if (
			! $post
			|| $post_type !== $post->post_type
			|| $post->post_name !== ( $payload['slug'] ?? '' )
			|| ! $article_type_matches
			|| PublicationGates::validate( $post_id, null, false )
		) {
			return new WP_Error( 'toplink_preview_unavailable', 'Record chưa đủ điều kiện preview.', array( 'status' => 404 ) );
		}
		$item = self::project_post( $post, true );
		return null === $item ? new WP_Error( 'toplink_preview_unavailable', 'Record chưa đủ điều kiện preview.', array( 'status' => 404 ) ) : new WP_REST_Response( array( 'item' => $item, 'lifecycle' => (string) get_post_meta( $post_id, '_toplink_editorial_lifecycle', true ) ), 200 );
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

	private static function project_post( \WP_Post $post, bool $preview = false ): ?array {
		if ( ( ! $preview && 'publish' !== $post->post_status ) || PublicationGates::validate( $post->ID, null, ! $preview ) ) {
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
		if ( 'id_list' === $definition['type'] ) {
			return array_values( array_filter( array_map( static fn ( $id ) => self::relation_slug( $key, (int) $id ), (array) $value ) ) );
		}
		if ( 'service_group' === $key && is_array( $value ) ) {
			return $value[0] ?? null;
		}
		unset( $post );
		return $value;
	}

	private static function relation_slug( string $key, int $post_id ): ?string {
		$expected_type = 'related_services' === $key ? 'service' : 'post';
		$post = get_post( $post_id );
		if ( ! $post || $expected_type !== $post->post_type || 'publish' !== $post->post_status || PublicationGates::validate( $post_id ) ) {
			return null;
		}
		if ( 'related_knowledge' === $key && 'knowledge' !== PublicationGates::article_type( $post_id ) ) {
			return null;
		}
		return $post->post_name;
	}

	private static function field_wrapper( mixed $value, string $owner, string $source ): array {
		return array( 'value' => $value, 'owner' => $owner, 'source' => $source, 'status' => 'APPROVED' );
	}

	private static function empty_value( mixed $value ): bool {
		return null === $value || '' === trim( is_scalar( $value ) ? (string) $value : '' ) && empty( $value );
	}
}
