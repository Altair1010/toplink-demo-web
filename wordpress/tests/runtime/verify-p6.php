<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

use Toplink\ContentModel\IntegrationAuth;
use Toplink\ContentModel\SchemaRegistry;

$GLOBALS['p6_failures'] = array();
$GLOBALS['p6_passes']   = array();

function p6_assert( bool $condition, string $label ): void {
	if ( $condition ) {
		$GLOBALS['p6_passes'][] = $label;
		echo "PASS: {$label}\n";
		return;
	}
	$GLOBALS['p6_failures'][] = $label;
	echo "FAIL: {$label}\n";
}

function p6_rest( string $route, array $params = array() ): array {
	$request = new WP_REST_Request( 'GET', $route );
	foreach ( $params as $key => $value ) {
		$request->set_param( $key, $value );
	}
	$response = rest_do_request( $request );
	return array( $response->get_status(), $response->get_data() );
}

function p6_user_id( string $env_name ): int {
	$user = get_user_by( 'login', getenv( $env_name ) );
	if ( ! $user ) {
		throw new RuntimeException( "Missing local user from {$env_name}." );
	}
	return (int) $user->ID;
}

function p6_record( string $post_type, string $slug, int $author_id, string $category = '' ): int {
	$existing = get_page_by_path( $slug, OBJECT, $post_type );
	$post_id  = wp_insert_post(
		array(
			'ID'           => $existing ? (int) $existing->ID : 0,
			'post_type'    => $post_type,
			'post_status'  => 'draft',
			'post_name'    => $slug,
			'post_title'   => '__P6_INTEGRATION_TEST__ ' . $slug,
			'post_excerpt' => '__P6_INTEGRATION_TEST__ summary',
			'post_content' => "__P6_INTEGRATION_TEST__ body\n\nLocal automated verification only.",
			'post_author'  => $author_id,
		),
		true
	);
	if ( is_wp_error( $post_id ) ) {
		throw new RuntimeException( $post_id->get_error_message() );
	}
	if ( $category ) {
		$term = get_term_by( 'slug', $category, 'category' );
		wp_set_post_terms( $post_id, array( (int) $term->term_id ), 'category' );
	}
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'draft' );
	update_post_meta( $post_id, '_toplink_field_governance', array() );
	return (int) $post_id;
}

function p6_prepare_valid( int $post_id, string $post_type ): void {
	$values = array(
		'who_it_may_fit'           => array( '__P6_INTEGRATION_TEST__ bounded fit' ),
		'limitations_cautions'     => array( '__P6_INTEGRATION_TEST__ caution' ),
		'professional_evaluation'  => '__P6_INTEGRATION_TEST__ professional evaluation',
		'experience_process'       => array( '__P6_INTEGRATION_TEST__ process' ),
		'safe_positioning'         => '__P6_INTEGRATION_TEST__ safe positioning',
		'supported_use_statements' => array( '__P6_INTEGRATION_TEST__ supported statement' ),
		'documentation_status'     => '__P6_INTEGRATION_TEST__ documentation accepted',
		'evidence_state'           => '__P6_INTEGRATION_TEST__ evidence accepted',
		'evidence_reference_state' => '__P6_INTEGRATION_TEST__ references accepted',
		'seo'                      => array( 'title' => '__P6_INTEGRATION_TEST__ title', 'description' => '__P6_INTEGRATION_TEST__ description', 'canonicalPath' => '/__p6_integration_test__/' ),
	);
	foreach ( $values as $key => $value ) {
		if ( array_key_exists( $key, SchemaRegistry::fields_for_post_type( $post_type ) ) ) {
			update_post_meta( $post_id, $key, $value );
		}
	}
	if ( 'service' === $post_type ) {
		$term = term_exists( 'p6-integration-test-group', 'service_group' );
		if ( ! $term ) {
			$term = wp_insert_term( '__P6_INTEGRATION_TEST__ group', 'service_group', array( 'slug' => 'p6-integration-test-group' ) );
		}
		$term_id = is_array( $term ) ? (int) $term['term_id'] : (int) $term;
		wp_set_post_terms( $post_id, array( $term_id ), 'service_group' );
	}
	$governance = array();
	foreach ( SchemaRegistry::fields_for_post_type( $post_type ) as $key => $definition ) {
		if ( empty( $definition['derived'] ) ) {
			$governance[ $key ] = array( 'source' => '__P6_INTEGRATION_TEST__ local source', 'status' => 'APPROVED' );
		}
	}
	update_post_meta( $post_id, '_toplink_field_governance', $governance );
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'approved' );
}

$editor_id = p6_user_id( 'TOPLINK_WP_EDITOR_USER' );
wp_set_current_user( $editor_id );

$article_id = p6_record( 'post', 'p6-integration-test-valid-article', $editor_id, 'kien-thuc' );
p6_prepare_valid( $article_id, 'post' );
wp_update_post( array( 'ID' => $article_id, 'post_status' => 'publish' ) );

$service_id = p6_record( 'service', 'p6-integration-test-valid-service', $editor_id );
p6_prepare_valid( $service_id, 'service' );
wp_update_post( array( 'ID' => $service_id, 'post_status' => 'publish' ) );

$product_id = p6_record( 'product', 'p6-integration-test-valid-product', $editor_id );
p6_prepare_valid( $product_id, 'product' );
wp_update_post( array( 'ID' => $product_id, 'post_status' => 'publish' ) );

$service = get_post( $service_id );
$article = get_post( $article_id );

list( $collection_status, $collection ) = p6_rest(
	'/toplink/v1/services',
	array( 'page' => 1, 'per_page' => 1 )
);
$pagination = $collection['pagination'] ?? array();
p6_assert(
	200 === $collection_status
	&& 1 === ( $pagination['page'] ?? 0 )
	&& 1 === ( $pagination['per_page'] ?? 0 )
	&& isset( $pagination['total_items'], $pagination['total_pages'] )
	&& array_key_exists( 'next_page', $pagination ),
	'Pagination — collection exposes bounded stable metadata'
);

list( , $bounded ) = p6_rest(
	'/toplink/v1/services',
	array( 'page' => 1, 'per_page' => 500 )
);
p6_assert( 100 === ( $bounded['pagination']['per_page'] ?? 0 ), 'Pagination — per_page is capped at 100' );

$service_governance = (array) get_post_meta( $service->ID, '_toplink_field_governance', true );
$service_governance['related_knowledge'] = array(
	'source' => '__P6_INTEGRATION_TEST__ relation',
	'status' => 'APPROVED',
);
update_post_meta( $service->ID, 'related_knowledge', array( (int) $article->ID ) );
update_post_meta( $service->ID, '_toplink_field_governance', $service_governance );
list( , $service_data ) = p6_rest( '/toplink/v1/services/p6-integration-test-valid-service' );
$relation_value = $service_data['related_knowledge']['value'] ?? null;
p6_assert(
	array( 'p6-integration-test-valid-article' ) === $relation_value,
	'Relations — Service related knowledge projects route-safe slugs, never numeric IDs'
);

$product_governance = (array) get_post_meta( $product_id, '_toplink_field_governance', true );
$product_governance['related_knowledge'] = array( 'source' => '__P6_INTEGRATION_TEST__ relation', 'status' => 'APPROVED' );
update_post_meta( $product_id, 'related_knowledge', array( $article_id ) );
update_post_meta( $product_id, '_toplink_field_governance', $product_governance );
list( , $product_data ) = p6_rest( '/toplink/v1/products/p6-integration-test-valid-product' );
p6_assert(
	array( 'p6-integration-test-valid-article' ) === ( $product_data['related_knowledge']['value'] ?? null ),
	'Relations - Product related knowledge projects route-safe slugs'
);

$article_governance = (array) get_post_meta( $article_id, '_toplink_field_governance', true );
$article_governance['related_services'] = array( 'source' => '__P6_INTEGRATION_TEST__ relation', 'status' => 'APPROVED' );
$article_governance['related_articles'] = array( 'source' => '__P6_INTEGRATION_TEST__ relation', 'status' => 'APPROVED' );
update_post_meta( $article_id, 'related_services', array( $service_id ) );
update_post_meta( $article_id, 'related_articles', array( $article_id ) );
update_post_meta( $article_id, '_toplink_field_governance', $article_governance );
list( , $article_data ) = p6_rest( '/toplink/v1/articles/p6-integration-test-valid-article' );
p6_assert(
	array( 'p6-integration-test-valid-service' ) === ( $article_data['related_services']['value'] ?? null )
	&& array( 'p6-integration-test-valid-article' ) === ( $article_data['related_articles']['value'] ?? null ),
	'Relations - Article relations project route-safe slugs'
);

$media = get_page_by_path( 'p6-integration-test-media', OBJECT, 'attachment' );
$media_id = $media ? (int) $media->ID : wp_insert_attachment(
	array(
		'post_title'     => '__P6_INTEGRATION_TEST__ media',
		'post_name'      => 'p6-integration-test-media',
		'post_status'    => 'inherit',
		'post_mime_type' => 'image/png',
		'guid'           => 'http://127.0.0.1:8085/__P6_INTEGRATION_TEST__.png',
	)
);
update_post_meta( $media_id, '_wp_attachment_image_alt', '__P6_INTEGRATION_TEST__ alt' );
update_post_meta( $media_id, 'source_provenance', '__P6_INTEGRATION_TEST__ generated local asset' );
update_post_meta( $media_id, 'authorization', '__P6_INTEGRATION_TEST__ local-only authorization' );
update_post_meta( $media_id, 'media_role', 'atmosphere' );
update_post_meta( $media_id, 'identity_class', 'abstract' );
update_post_meta( $media_id, 'publishability_status', 'publishable' );
wp_update_attachment_metadata( $media_id, array( 'width' => 12, 'height' => 8, 'file' => '__P6_INTEGRATION_TEST__.png' ) );
$media_governance = array();
foreach ( SchemaRegistry::fields_for_post_type( 'attachment' ) as $key => $definition ) {
	if ( empty( $definition['derived'] ) ) {
		$media_governance[ $key ] = array( 'source' => '__P6_INTEGRATION_TEST__ local source', 'status' => 'APPROVED' );
	}
}
update_post_meta( $media_id, '_toplink_field_governance', $media_governance );
$service_governance['media'] = array( 'source' => '__P6_INTEGRATION_TEST__ relation', 'status' => 'APPROVED' );
update_post_meta( $service_id, 'media', array( $media_id ) );
update_post_meta( $service_id, '_toplink_field_governance', $service_governance );
list( $media_status, $media_data ) = p6_rest( '/toplink/v1/media/' . $media_id );
list( , $service_with_media ) = p6_rest( '/toplink/v1/services/p6-integration-test-valid-service' );
p6_assert(
	200 === $media_status
	&& 12 === ( $media_data['asset']['value']['width'] ?? 0 )
	&& '__P6_INTEGRATION_TEST__ alt' === ( $service_with_media['media']['value'][0]['alt_text']['value'] ?? '' ),
	'Media - approved local attachment projects centrally through the Service contract'
);

add_post_meta( $service->ID, '_wp_old_slug', 'p6-integration-test-old-service', false );
list( $redirect_status, $redirect_data ) = p6_rest(
	'/toplink/v1/redirects/services/p6-integration-test-old-service'
);
p6_assert(
	200 === $redirect_status
	&& 'p6-integration-test-valid-service' === ( $redirect_data['slug'] ?? '' )
	&& '/dich-vu/p6-integration-test-valid-service' === ( $redirect_data['path'] ?? '' ),
	'Slug — old service slug resolves to one canonical current path'
);

list( $preview_status ) = p6_rest( '/toplink/v1/preview/service/' . $service->ID );
p6_assert( 401 === $preview_status, 'Preview — private projection denies a missing intent' );

$preview_slug = 'p6-integration-test-preview-service';
$preview_post = get_page_by_path( $preview_slug, OBJECT, 'service' );
$preview_id = wp_insert_post(
	array(
		'ID'           => $preview_post ? (int) $preview_post->ID : 0,
		'post_type'    => 'service',
		'post_status'  => 'draft',
		'post_name'    => $preview_slug,
		'post_title'   => '__P6_INTEGRATION_TEST__ private preview service',
		'post_excerpt' => '__P6_INTEGRATION_TEST__ preview summary',
		'post_content' => "__P6_INTEGRATION_TEST__ preview body\n\nLocal only.",
		'post_author'  => (int) $service->post_author,
		'menu_order'   => 0,
	),
	true
);
if ( is_wp_error( $preview_id ) ) {
	throw new RuntimeException( $preview_id->get_error_message() );
}
$preview_id = (int) $preview_id;
foreach ( array( 'who_it_may_fit', 'limitations_cautions', 'professional_evaluation', 'experience_process', 'seo', 'evidence_state' ) as $meta_key ) {
	update_post_meta( $preview_id, $meta_key, get_post_meta( $service->ID, $meta_key, true ) );
}
update_post_meta( $preview_id, '_toplink_field_governance', get_post_meta( $service->ID, '_toplink_field_governance', true ) );
update_post_meta( $preview_id, '_toplink_editorial_lifecycle', 'draft' );
$service_groups = wp_get_post_terms( $service->ID, 'service_group', array( 'fields' => 'ids' ) );
wp_set_post_terms( $preview_id, $service_groups, 'service_group' );

$intent = IntegrationAuth::sign_preview_intent(
	array( 'post_type' => 'service', 'id' => $preview_id, 'slug' => $preview_slug, 'exp' => time() + IntegrationAuth::PREVIEW_TTL )
);
$preview_request = new WP_REST_Request( 'GET', '/toplink/v1/preview/service/' . $preview_id );
$preview_request->set_header( 'X-Toplink-Preview-Intent', $intent );
$preview_response = rest_do_request( $preview_request );
list( $public_draft_status ) = p6_rest( '/toplink/v1/services/' . $preview_slug );
p6_assert(
	200 === $preview_response->get_status()
	&& 'draft' === ( $preview_response->get_data()['lifecycle'] ?? '' )
	&& 404 === $public_draft_status,
	'Preview — valid short-lived intent sees draft while public REST remains blind'
);

$tampered_request = new WP_REST_Request( 'GET', '/toplink/v1/preview/service/' . $preview_id );
$tampered_request->set_header( 'X-Toplink-Preview-Intent', $intent . 'x' );
$expired_intent = IntegrationAuth::sign_preview_intent(
	array( 'post_type' => 'service', 'id' => $preview_id, 'slug' => $preview_slug, 'exp' => time() - 1 )
);
$expired_request = new WP_REST_Request( 'GET', '/toplink/v1/preview/service/' . $preview_id );
$expired_request->set_header( 'X-Toplink-Preview-Intent', $expired_intent );
p6_assert(
	401 === rest_do_request( $tampered_request )->get_status()
	&& 401 === rest_do_request( $expired_request )->get_status(),
	'Preview — tampered and expired intents are rejected'
);

$captured_webhook = null;
$capture = static function ( $preempt, $args, $url ) use ( &$captured_webhook ) {
	if ( str_contains( (string) $url, '/api/cms/revalidate' ) ) {
		$captured_webhook = array( 'args' => $args, 'url' => $url );
		return array( 'headers' => array(), 'body' => '{"ok":true}', 'response' => array( 'code' => 200, 'message' => 'OK' ), 'cookies' => array(), 'filename' => null );
	}
	return $preempt;
};
add_filter( 'pre_http_request', $capture, 10, 3 );
$original_excerpt = $service->post_excerpt;
$saved_id = wp_update_post( array( 'ID' => $service->ID, 'post_excerpt' => '__P6_INTEGRATION_TEST__ webhook update' ), true );
remove_filter( 'pre_http_request', $capture, 10 );
wp_update_post( array( 'ID' => $service->ID, 'post_excerpt' => $original_excerpt ) );
$webhook_body = (string) ( $captured_webhook['args']['body'] ?? '' );
$webhook_headers = (array) ( $captured_webhook['args']['headers'] ?? array() );
$webhook_timestamp = (string) ( $webhook_headers['X-Toplink-Timestamp'] ?? '' );
$webhook_signature = (string) ( $webhook_headers['X-Toplink-Signature'] ?? '' );
$expected_signature = hash_hmac( 'sha256', $webhook_timestamp . '.' . $webhook_body, (string) getenv( 'TOPLINK_WEBHOOK_SECRET' ) );
$webhook_payload = json_decode( $webhook_body, true );
$webhook_ok = ! is_wp_error( $saved_id )
	&& is_array( $captured_webhook )
	&& hash_equals( $expected_signature, $webhook_signature )
	&& 'content.updated' === ( $webhook_payload['event'] ?? '' )
	&& 'Service' === ( $webhook_payload['domain'] ?? '' )
	&& ! array_key_exists( 'body', $webhook_payload );
if ( ! $webhook_ok ) {
	echo 'DIAG: ' . wp_json_encode(
		array(
			'save_error'      => is_wp_error( $saved_id ),
			'captured'        => is_array( $captured_webhook ),
			'header_keys'     => array_keys( $webhook_headers ),
			'signature_match' => hash_equals( $expected_signature, $webhook_signature ),
			'event'           => $webhook_payload['event'] ?? null,
			'domain'          => $webhook_payload['domain'] ?? null,
			'has_body_field'  => is_array( $webhook_payload ) && array_key_exists( 'body', $webhook_payload ),
		)
	) . "\n";
}
p6_assert(
	$webhook_ok,
	'Webhook — WordPress emits compact raw-body HMAC event without private content'
);

echo sprintf( "SUMMARY: %d passed, %d failed.\n", count( $GLOBALS['p6_passes'] ), count( $GLOBALS['p6_failures'] ) );
if ( $GLOBALS['p6_failures'] ) {
	exit( 1 );
}
