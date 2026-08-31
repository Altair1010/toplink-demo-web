<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

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

$service = get_page_by_path( 'p5-contract-test-valid-service', OBJECT, 'service' );
$article = get_page_by_path( 'p5-contract-test-valid-article', OBJECT, 'post' );
if ( ! $service || ! $article ) {
	throw new RuntimeException( 'Run the P5 runtime verifier before P6 verification.' );
}

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
list( , $service_data ) = p6_rest( '/toplink/v1/services/p5-contract-test-valid-service' );
$relation_value = $service_data['related_knowledge']['value'] ?? null;
p6_assert(
	array( 'p5-contract-test-valid-article' ) === $relation_value,
	'Relations — Service related knowledge projects route-safe slugs, never numeric IDs'
);

add_post_meta( $service->ID, '_wp_old_slug', 'p6-integration-test-old-service', false );
list( $redirect_status, $redirect_data ) = p6_rest(
	'/toplink/v1/redirects/services/p6-integration-test-old-service'
);
p6_assert(
	200 === $redirect_status
	&& 'p5-contract-test-valid-service' === ( $redirect_data['slug'] ?? '' )
	&& '/dich-vu/p5-contract-test-valid-service' === ( $redirect_data['path'] ?? '' ),
	'Slug — old service slug resolves to one canonical current path'
);

list( $preview_status ) = p6_rest( '/toplink/v1/preview/service/' . $service->ID );
p6_assert( 401 === $preview_status, 'Preview — private projection denies a missing intent' );

echo sprintf( "SUMMARY: %d passed, %d failed.\n", count( $GLOBALS['p6_passes'] ), count( $GLOBALS['p6_failures'] ) );
if ( $GLOBALS['p6_failures'] ) {
	exit( 1 );
}
