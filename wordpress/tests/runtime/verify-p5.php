<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

use Toplink\ContentModel\PublicationGates;
use Toplink\ContentModel\SchemaRegistry;

$GLOBALS['p5_failures'] = array();
$GLOBALS['p5_passes']   = array();

function p5_assert( bool $condition, string $label ): void {
	if ( $condition ) {
		$GLOBALS['p5_passes'][] = $label;
		echo "PASS: {$label}\n";
		return;
	}
	$GLOBALS['p5_failures'][] = $label;
	echo "FAIL: {$label}\n";
}

function p5_user_id( string $env_name ): int {
	$user = get_user_by( 'login', getenv( $env_name ) );
	if ( ! $user ) {
		throw new RuntimeException( "Missing local user from {$env_name}." );
	}
	return (int) $user->ID;
}

function p5_record( string $post_type, string $slug, int $author_id, string $category = '' ): int {
	$existing = get_page_by_path( $slug, OBJECT, $post_type );
	$data = array(
		'ID'           => $existing ? (int) $existing->ID : 0,
		'post_type'    => $post_type,
		'post_status'  => 'draft',
		'post_name'    => $slug,
		'post_title'   => '__P5_CONTRACT_TEST__ ' . $slug,
		'post_excerpt' => '__P5_CONTRACT_TEST__ summary',
		'post_content' => "__P5_CONTRACT_TEST__ body\n\nLocal automated verification only.",
		'post_author'  => $author_id,
	);
	$post_id = wp_insert_post( $data, true );
	if ( is_wp_error( $post_id ) ) {
		throw new RuntimeException( $post_id->get_error_message() );
	}
	if ( $category ) {
		$term = get_term_by( 'slug', $category, 'category' );
		wp_set_post_terms( $post_id, array( $term->term_id ), 'category' );
	}
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'draft' );
	update_post_meta( $post_id, '_toplink_field_governance', array() );
	return (int) $post_id;
}

function p5_prepare_valid( int $post_id, string $post_type ): void {
	$values = array(
		'who_it_may_fit'          => array( '__P5_CONTRACT_TEST__ bounded fit' ),
		'limitations_cautions'    => array( '__P5_CONTRACT_TEST__ caution' ),
		'professional_evaluation' => '__P5_CONTRACT_TEST__ professional evaluation',
		'experience_process'      => array( '__P5_CONTRACT_TEST__ process' ),
		'safe_positioning'        => '__P5_CONTRACT_TEST__ safe positioning',
		'supported_use_statements'=> array( '__P5_CONTRACT_TEST__ supported statement' ),
		'documentation_status'    => '__P5_CONTRACT_TEST__ documentation accepted',
		'evidence_state'          => '__P5_CONTRACT_TEST__ evidence accepted',
		'evidence_reference_state'=> '__P5_CONTRACT_TEST__ references accepted',
		'seo'                     => array( 'title' => '__P5_CONTRACT_TEST__ title', 'description' => '__P5_CONTRACT_TEST__ description', 'canonicalPath' => '/__p5_contract_test__/' ),
	);
	foreach ( $values as $key => $value ) {
		if ( array_key_exists( $key, SchemaRegistry::fields_for_post_type( $post_type ) ) ) {
			update_post_meta( $post_id, $key, $value );
		}
	}
	if ( 'service' === $post_type ) {
		$term = term_exists( 'p5-contract-test-group', 'service_group' );
		if ( ! $term ) {
			$term = wp_insert_term( '__P5_CONTRACT_TEST__ group', 'service_group', array( 'slug' => 'p5-contract-test-group' ) );
		}
		$term_id = is_array( $term ) ? (int) $term['term_id'] : (int) $term;
		wp_set_post_terms( $post_id, array( $term_id ), 'service_group' );
	}
	$governance = array();
	foreach ( SchemaRegistry::fields_for_post_type( $post_type ) as $key => $definition ) {
		if ( empty( $definition['derived'] ) ) {
			$governance[ $key ] = array( 'source' => '__P5_CONTRACT_TEST__ local source', 'status' => 'APPROVED' );
		}
	}
	update_post_meta( $post_id, '_toplink_field_governance', $governance );
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'approved' );
}

function p5_rest_data( string $route ): array {
	$response = rest_do_request( new WP_REST_Request( 'GET', $route ) );
	return array( $response->get_status(), $response->get_data() );
}

$author_id = p5_user_id( 'TOPLINK_WP_AUTHOR_USER' );
$editor_id = p5_user_id( 'TOPLINK_WP_EDITOR_USER' );
$author = get_user_by( 'id', $author_id );
$editor = get_user_by( 'id', $editor_id );

p5_assert( ! $author->has_cap( 'publish_posts' ) && ! $author->has_cap( 'publish_toplink_services' ) && ! $author->has_cap( 'publish_toplink_products' ), 'B — Author lacks all three publish capabilities' );
p5_assert( $editor->has_cap( 'publish_posts' ) && $editor->has_cap( 'publish_toplink_services' ) && $editor->has_cap( 'publish_toplink_products' ), 'D — Editor has all three publish capabilities' );
p5_assert( ! $author->has_cap( 'activate_plugins' ) && ! $editor->has_cap( 'activate_plugins' ) && ! $editor->has_cap( 'switch_themes' ), 'Security — Author/Editor lack plugin and theme administration' );
p5_assert( $editor->has_cap( 'manage_toplink_settings' ), 'I — Editor can manage the Toplink settings surface' );

wp_set_current_user( $author_id );
$author_records = array();
foreach ( array( 'post' => 'kien-thuc', 'service' => '', 'product' => '' ) as $post_type => $category ) {
	$slug = 'p5-contract-test-author-' . $post_type;
	$post_id = p5_record( $post_type, $slug, $author_id, $category );
	$author_records[ $post_type ] = $post_id;
	p5_assert( 'draft' === get_post_status( $post_id ), "A — Author creates nonpublic {$post_type} draft" );
	wp_update_post( array( 'ID' => $post_id, 'post_status' => 'publish' ) );
	p5_assert( 'publish' !== get_post_status( $post_id ), "B — Author publish denied for {$post_type}" );
}
$saved_post = $_POST;
$_POST = array(
	'toplink_editorial_nonce' => wp_create_nonce( 'toplink_save_editorial_fields' ),
	'toplink_lifecycle'       => 'approved',
);
\Toplink\ContentModel\AdminUi::save_meta_box( $author_records['service'], get_post( $author_records['service'] ) );
p5_assert( 'approved' !== get_post_meta( $author_records['service'], '_toplink_editorial_lifecycle', true ), 'Workflow — Author cannot self-approve editorial lifecycle' );
$_POST = $saved_post;

wp_set_current_user( $editor_id );
$saved_post = $_POST;
$_POST = array(
	'toplink_editorial_nonce' => wp_create_nonce( 'toplink_save_editorial_fields' ),
	'toplink_lifecycle'       => 'approved',
	'toplink_source'          => array( 'title' => '__P5_CONTRACT_TEST__ editor source' ),
	'toplink_status'          => array( 'title' => 'APPROVED' ),
);
\Toplink\ContentModel\AdminUi::save_meta_box( $author_records['service'], get_post( $author_records['service'] ) );
$editor_saved_governance = (array) get_post_meta( $author_records['service'], '_toplink_field_governance', true );
p5_assert( 'approved' === get_post_meta( $author_records['service'], '_toplink_editorial_lifecycle', true ) && 'APPROVED' === ( $editor_saved_governance['title']['status'] ?? '' ), 'Workflow — Editor can persist canonical approval values through admin sanitization' );
$_POST = $saved_post;
$sanitized_settings_state = \Toplink\ContentModel\AdminUi::sanitize_settings_governance( array( 'public_display_name' => array( 'source' => 'DECISIONS.md D-001', 'status' => 'APPROVED' ) ) );
p5_assert( 'APPROVED' === ( $sanitized_settings_state['public_display_name']['status'] ?? '' ), 'I — SiteSettings sanitization preserves canonical APPROVED status' );
foreach ( array( 'post' => 'kien-thuc', 'service' => '', 'product' => '' ) as $post_type => $category ) {
	$post_id = p5_record( $post_type, 'p5-contract-test-incomplete-' . $post_type, $editor_id, $category );
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'approved' );
	wp_update_post( array( 'ID' => $post_id, 'post_status' => 'publish' ) );
	p5_assert( 'publish' !== get_post_status( $post_id ), "C — Required field gate blocks incomplete {$post_type}" );
}

$service_id = p5_record( 'service', 'p5-contract-test-valid-service', $editor_id );
p5_prepare_valid( $service_id, 'service' );
wp_update_post( array( 'ID' => $service_id, 'post_status' => 'publish' ) );
p5_assert( 'publish' === get_post_status( $service_id ), 'D — Editor publishes a valid Service' );
[$service_status, $service_data] = p5_rest_data( '/toplink/v1/services/p5-contract-test-valid-service' );
p5_assert( 200 === $service_status, 'D — Valid Service appears in public Toplink REST' );
p5_assert( 'published' === get_post_meta( $service_id, '_toplink_editorial_lifecycle', true ), 'Workflow — successful publication ends at lifecycle published' );

$governance = (array) get_post_meta( $service_id, '_toplink_field_governance', true );
update_post_meta( $service_id, 'faq', array( array( 'Test question', 'Test answer' ) ) );
$governance['faq'] = array( 'source' => '__P5_CONTRACT_TEST__', 'status' => 'PENDING' );
update_post_meta( $service_id, '_toplink_field_governance', $governance );
[, $service_data] = p5_rest_data( '/toplink/v1/services/p5-contract-test-valid-service' );
p5_assert( ! array_key_exists( 'faq', $service_data ), 'E — Optional PENDING field is omitted' );

update_post_meta( $service_id, 'related_knowledge', array( 999999 ) );
$governance['related_knowledge'] = array( 'source' => '__P5_CONTRACT_TEST__', 'status' => 'REFERENCE_ONLY' );
update_post_meta( $service_id, '_toplink_field_governance', $governance );
[, $service_data] = p5_rest_data( '/toplink/v1/services/p5-contract-test-valid-service' );
$reference_omitted = ! array_key_exists( 'related_knowledge', $service_data );
$governance['related_knowledge']['status'] = 'REJECTED';
update_post_meta( $service_id, '_toplink_field_governance', $governance );
[, $service_data] = p5_rest_data( '/toplink/v1/services/p5-contract-test-valid-service' );
p5_assert( $reference_omitted && ! array_key_exists( 'related_knowledge', $service_data ), 'F — REFERENCE_ONLY and REJECTED values are omitted' );

$product_id = p5_record( 'product', 'p5-contract-test-valid-product', $editor_id );
p5_prepare_valid( $product_id, 'product' );
wp_update_post( array( 'ID' => $product_id, 'post_status' => 'publish' ) );
[$product_status] = p5_rest_data( '/toplink/v1/products/p5-contract-test-valid-product' );
p5_assert( 'publish' === get_post_status( $product_id ) && 200 === $product_status, 'D — Editor publishes valid Product into public REST' );
$product_governance = (array) get_post_meta( $product_id, '_toplink_field_governance', true );
$product_governance['evidence_state']['status'] = 'PENDING';
update_post_meta( $product_id, '_toplink_field_governance', $product_governance );
do_action( 'save_post', $product_id, get_post( $product_id ), true );
p5_assert( 'publish' !== get_post_status( $product_id ), 'Publication — published record returns to pending when a required fact becomes nonpublishable' );
p5_prepare_valid( $product_id, 'product' );
wp_update_post( array( 'ID' => $product_id, 'post_status' => 'publish' ) );

$article_id = p5_record( 'post', 'p5-contract-test-valid-article', $editor_id, 'kien-thuc' );
p5_prepare_valid( $article_id, 'post' );
wp_update_post( array( 'ID' => $article_id, 'post_status' => 'publish' ) );
[$article_status] = p5_rest_data( '/toplink/v1/articles/p5-contract-test-valid-article' );
p5_assert( 'publish' === get_post_status( $article_id ) && 200 === $article_status, 'D — Editor publishes valid Article into public REST' );

$story_id = p5_record( 'post', 'p5-contract-test-customer-story', $editor_id, 'cau-chuyen-khach-hang' );
p5_prepare_valid( $story_id, 'post' );
foreach ( array( '_toplink_story_real', '_toplink_story_consent', '_toplink_story_context', '_toplink_story_identity_authorized', '_toplink_story_evidence_accepted' ) as $gate ) {
	update_post_meta( $story_id, $gate, '0' );
}
wp_update_post( array( 'ID' => $story_id, 'post_status' => 'publish' ) );
$story_blocked = 'publish' !== get_post_status( $story_id );
foreach ( array( '_toplink_story_real', '_toplink_story_consent', '_toplink_story_context', '_toplink_story_identity_authorized', '_toplink_story_evidence_accepted' ) as $gate ) {
	update_post_meta( $story_id, $gate, '1' );
}
update_post_meta( $story_id, '_toplink_editorial_lifecycle', 'approved' );
wp_update_post( array( 'ID' => $story_id, 'post_status' => 'publish' ) );
[$story_status] = p5_rest_data( '/toplink/v1/articles/p5-contract-test-customer-story' );
p5_assert( $story_blocked && 'publish' === get_post_status( $story_id ) && 200 === $story_status, 'G — Customer story consent gates block then allow local test story' );

$attachment = get_page_by_path( 'p5-contract-test-media', OBJECT, 'attachment' );
$attachment_id = $attachment ? (int) $attachment->ID : wp_insert_attachment( array( 'post_title' => '__P5_CONTRACT_TEST__ media', 'post_name' => 'p5-contract-test-media', 'post_status' => 'inherit', 'post_mime_type' => 'image/png', 'guid' => 'http://127.0.0.1:8085/__P5_CONTRACT_TEST__.png' ) );
update_post_meta( $attachment_id, '_wp_attachment_image_alt', '__P5_CONTRACT_TEST__ alt' );
update_post_meta( $attachment_id, 'source_provenance', '__P5_CONTRACT_TEST__ generated local asset' );
update_post_meta( $attachment_id, 'authorization', '__P5_CONTRACT_TEST__ local-only authorization' );
update_post_meta( $attachment_id, 'media_role', 'atmosphere' );
update_post_meta( $attachment_id, 'identity_class', 'abstract' );
update_post_meta( $attachment_id, 'publishability_status', 'publishable' );
wp_update_attachment_metadata( $attachment_id, array( 'width' => 1, 'height' => 1, 'file' => '__P5_CONTRACT_TEST__.png' ) );
$media_governance = array();
foreach ( SchemaRegistry::fields_for_post_type( 'attachment' ) as $key => $definition ) {
	if ( empty( $definition['derived'] ) ) {
		$media_governance[ $key ] = array( 'source' => '__P5_CONTRACT_TEST__ local source', 'status' => 'PENDING' );
	}
}
update_post_meta( $attachment_id, '_toplink_field_governance', $media_governance );
[$media_block_status] = p5_rest_data( '/toplink/v1/media/' . $attachment_id );
foreach ( $media_governance as &$state ) { $state['status'] = 'APPROVED'; }
unset( $state );
update_post_meta( $attachment_id, '_toplink_field_governance', $media_governance );
[$media_ok_status, $media_data] = p5_rest_data( '/toplink/v1/media/' . $attachment_id );
p5_assert( 404 === $media_block_status && 200 === $media_ok_status && isset( $media_data['asset'], $media_data['alt_text'], $media_data['media_role'] ), 'H — Media authorization gate blocks then projects approved metadata' );
update_post_meta( $attachment_id, 'identity_class', 'generic_stock' );
update_post_meta( $attachment_id, 'media_role', 'evidence' );
[$stock_evidence_status] = p5_rest_data( '/toplink/v1/media/' . $attachment_id );
p5_assert( 404 === $stock_evidence_status, 'H — Generic stock cannot project as Toplink evidence' );
update_post_meta( $attachment_id, 'identity_class', 'abstract' );
update_post_meta( $attachment_id, 'media_role', 'atmosphere' );

$settings_values = (array) get_option( 'toplink_site_settings', array() );
$settings_states = (array) get_option( 'toplink_site_settings_governance', array() );
[$settings_status, $settings_data] = p5_rest_data( '/toplink/v1/site-settings' );
p5_assert( 200 === $settings_status && isset( $settings_data['public_display_name'] ) && ! isset( $settings_data['hotline'], $settings_data['zalo_destination'], $settings_data['facebook_destination'] ) && 'PENDING' === ( $settings_states['hotline']['status'] ?? '' ) && empty( $settings_values['hotline'] ), 'I — SiteSettings emits approved identity and omits pending contact facts' );

[$schema_status, $schema_data] = p5_rest_data( '/toplink/v1/schema' );
$domain_names = array_keys( $schema_data['domains'] ?? array() );
$expected_fields = array(
	'Service'      => array( 'title', 'slug', 'summary', 'service_group', 'body', 'who_it_may_fit', 'limitations_cautions', 'professional_evaluation', 'experience_process', 'faq', 'media', 'related_knowledge', 'display_order', 'seo', 'evidence_state' ),
	'Product'      => array( 'title', 'slug', 'summary', 'safe_positioning', 'supported_use_statements', 'limitations_cautions', 'documentation_status', 'body', 'faq', 'media', 'related_knowledge', 'seo', 'evidence_state' ),
	'Article'      => array( 'title', 'slug', 'summary', 'body', 'article_type', 'author', 'published_at', 'updated_at', 'featured_media', 'related_services', 'related_articles', 'evidence_reference_state', 'seo' ),
	'Media'        => array( 'asset', 'source_provenance', 'authorization', 'alt_text', 'caption', 'media_role', 'identity_class', 'publishability_status' ),
	'SiteSettings' => array( 'public_display_name', 'address', 'opening_hours', 'hotline', 'zalo_destination', 'facebook_destination', 'social_links', 'legal_identifiers' ),
);
$fields_match = true;
foreach ( $expected_fields as $domain => $fields ) {
	$fields_match = $fields_match && $fields === array_keys( $schema_data['domains'][ $domain ] ?? array() );
}
p5_assert( 200 === $schema_status && SchemaRegistry::PUBLIC_DOMAINS === $domain_names && $fields_match, 'J — Public schema has exactly five domains and the 57 contracted fields' );
$schema_json = strtolower( wp_json_encode( $schema_data ) );
$forbidden = array( 'price', 'sale_price', 'cart', 'checkout', 'purchase_url', 'inventory-commerce', 'booking' );
$leaks = array_values( array_filter( $forbidden, static fn ( string $token ): bool => str_contains( $schema_json, $token ) ) );
p5_assert( array() === $leaks, 'K — Public schema contains no forbidden commercial fields' );

$public_payloads = wp_json_encode( array( $service_data, $media_data, $settings_data, $schema_data ) );
$secret_values = array_filter( array( getenv( 'WORDPRESS_DB_PASSWORD' ), getenv( 'TOPLINK_WP_ADMIN_PASSWORD' ), getenv( 'TOPLINK_WP_AUTHOR_PASSWORD' ), getenv( 'TOPLINK_WP_EDITOR_PASSWORD' ) ) );
$secret_leak = false;
foreach ( $secret_values as $secret ) { $secret_leak = $secret_leak || str_contains( $public_payloads, $secret ); }
p5_assert( ! $secret_leak && ! str_contains( $public_payloads, '_toplink_field_governance' ) && ! str_contains( $public_payloads, '_toplink_editorial_lifecycle' ), 'L — Public REST excludes credentials and private governance metadata' );

$routes = rest_get_server()->get_routes();
$read_only = true;
foreach ( $routes as $route => $handlers ) {
	if ( ! str_starts_with( $route, '/toplink/v1' ) ) { continue; }
	foreach ( $handlers as $handler ) {
		if ( isset( $handler['methods'] ) && array_filter( array_keys( $handler['methods'] ), static fn ( string $method ): bool => ! in_array( $method, array( 'GET', 'HEAD' ), true ) ) ) { $read_only = false; }
	}
}
p5_assert( $read_only, 'Security — public Toplink namespace is read-only' );

echo sprintf( "SUMMARY: %d passed, %d failed.\n", count( $GLOBALS['p5_passes'] ), count( $GLOBALS['p5_failures'] ) );
if ( $GLOBALS['p5_failures'] ) {
	exit( 1 );
}
