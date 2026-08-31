<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

use Toplink\ContentModel\IntegrationAuth;
use Toplink\ContentModel\SchemaRegistry;

const TOPLINK_P6_LIFECYCLE_OPTION = 'toplink_p6_lifecycle_record_id';
const TOPLINK_P6_PREVIEW_OPTION   = 'toplink_p6_preview_record_id';

function p6_lifecycle_editor_id(): int {
	$user = get_user_by( 'login', getenv( 'TOPLINK_WP_EDITOR_USER' ) );
	if ( ! $user ) {
		throw new RuntimeException( 'Missing P6 local editor.' );
	}
	return (int) $user->ID;
}

function p6_lifecycle_prepare_fields( int $post_id ): void {
	$values = array(
		'who_it_may_fit'          => array( '__P6_INTEGRATION_TEST__ bounded fit' ),
		'limitations_cautions'    => array( '__P6_INTEGRATION_TEST__ caution' ),
		'professional_evaluation' => '__P6_INTEGRATION_TEST__ professional evaluation',
		'experience_process'      => array( '__P6_INTEGRATION_TEST__ process' ),
		'evidence_state'          => '__P6_INTEGRATION_TEST__ evidence accepted',
		'seo'                     => array( 'title' => '__P6_INTEGRATION_TEST__ lifecycle', 'description' => '__P6_INTEGRATION_TEST__ lifecycle description', 'canonicalPath' => '/__p6_integration_test__/' ),
	);
	foreach ( $values as $key => $value ) {
		update_post_meta( $post_id, $key, $value );
	}
	$term = term_exists( 'p6-integration-test-group', 'service_group' );
	if ( ! $term ) {
		$term = wp_insert_term( '__P6_INTEGRATION_TEST__ group', 'service_group', array( 'slug' => 'p6-integration-test-group' ) );
	}
	$term_id = is_array( $term ) ? (int) $term['term_id'] : (int) $term;
	wp_set_post_terms( $post_id, array( $term_id ), 'service_group' );
	$governance = array();
	foreach ( SchemaRegistry::fields_for_post_type( 'service' ) as $key => $definition ) {
		if ( empty( $definition['derived'] ) ) {
			$governance[ $key ] = array( 'source' => '__P6_INTEGRATION_TEST__ local source', 'status' => 'APPROVED' );
		}
	}
	update_post_meta( $post_id, '_toplink_field_governance', $governance );
}

function p6_lifecycle_record( string $option ): \WP_Post {
	$post = get_post( (int) get_option( $option, 0 ) );
	if ( ! $post || 'service' !== $post->post_type ) {
		throw new RuntimeException( 'Run prepare before this lifecycle action.' );
	}
	return $post;
}

function p6_lifecycle_save( array $data ): int {
	$result = empty( $data['ID'] ) ? wp_insert_post( $data, true ) : wp_update_post( $data, true );
	if ( is_wp_error( $result ) ) {
		throw new RuntimeException( $result->get_error_message() );
	}
	return (int) $result;
}

function p6_lifecycle_output( \WP_Post $post, array $extra = array() ): void {
	echo wp_json_encode(
		array_merge(
			array( 'id' => (int) $post->ID, 'slug' => $post->post_name, 'title' => $post->post_title, 'status' => $post->post_status ),
			$extra
		),
		JSON_UNESCAPED_SLASHES
	);
}

$action = sanitize_key( (string) ( $args[0] ?? '' ) );
wp_set_current_user( p6_lifecycle_editor_id() );

if ( 'prepare' === $action ) {
	$existing_id = (int) get_option( TOPLINK_P6_LIFECYCLE_OPTION, 0 );
	$post_id = p6_lifecycle_save(
		array(
			'ID'           => get_post( $existing_id ) ? $existing_id : 0,
			'post_type'    => 'service',
			'post_status'  => 'draft',
			'post_name'    => 'p6-integration-test-lifecycle-a',
			'post_title'   => '__P6_INTEGRATION_TEST__ lifecycle A',
			'post_excerpt' => '__P6_INTEGRATION_TEST__ lifecycle summary A',
			'post_content' => "__P6_INTEGRATION_TEST__ lifecycle body\n\nLocal automated verification only.",
			'post_author'  => p6_lifecycle_editor_id(),
		)
	);
	update_option( TOPLINK_P6_LIFECYCLE_OPTION, $post_id, false );
	p6_lifecycle_prepare_fields( $post_id );
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'approved' );
	wp_update_post( array( 'ID' => $post_id, 'post_status' => 'publish' ) );
	p6_lifecycle_output( get_post( $post_id ) );
	return;
}

if ( 'preview' === $action ) {
	$existing_id = (int) get_option( TOPLINK_P6_PREVIEW_OPTION, 0 );
	$post_id = p6_lifecycle_save(
		array(
			'ID'           => get_post( $existing_id ) ? $existing_id : 0,
			'post_type'    => 'service',
			'post_status'  => 'draft',
			'post_name'    => 'p6-integration-test-private-preview',
			'post_title'   => '__P6_INTEGRATION_TEST__ private preview',
			'post_excerpt' => '__P6_INTEGRATION_TEST__ private preview summary',
			'post_content' => '__P6_INTEGRATION_TEST__ private preview body',
			'post_author'  => p6_lifecycle_editor_id(),
		)
	);
	update_option( TOPLINK_P6_PREVIEW_OPTION, $post_id, false );
	p6_lifecycle_prepare_fields( $post_id );
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'draft' );
	$post = get_post( $post_id );
	$intent = IntegrationAuth::sign_preview_intent( array( 'post_type' => 'service', 'id' => $post_id, 'slug' => $post->post_name, 'exp' => time() + IntegrationAuth::PREVIEW_TTL ) );
	p6_lifecycle_output( $post, array( 'intent' => $intent ) );
	return;
}

$post = p6_lifecycle_record( TOPLINK_P6_LIFECYCLE_OPTION );
if ( 'update' === $action ) {
	p6_lifecycle_save( array( 'ID' => $post->ID, 'post_title' => '__P6_INTEGRATION_TEST__ lifecycle B' ) );
} elseif ( 'slug' === $action ) {
	p6_lifecycle_save( array( 'ID' => $post->ID, 'post_name' => 'p6-integration-test-lifecycle-b' ) );
} elseif ( 'unpublish' === $action ) {
	p6_lifecycle_save( array( 'ID' => $post->ID, 'post_status' => 'draft' ) );
} elseif ( 'republish' === $action ) {
	update_post_meta( $post->ID, '_toplink_editorial_lifecycle', 'approved' );
	p6_lifecycle_save( array( 'ID' => $post->ID, 'post_status' => 'publish' ) );
} elseif ( 'delete' === $action ) {
	if ( 'publish' !== $post->post_status ) {
		update_post_meta( $post->ID, '_toplink_editorial_lifecycle', 'approved' );
		p6_lifecycle_save( array( 'ID' => $post->ID, 'post_status' => 'publish' ) );
	}
	$deleted = wp_delete_post( $post->ID, true );
	delete_option( TOPLINK_P6_LIFECYCLE_OPTION );
	echo wp_json_encode( array( 'id' => (int) $post->ID, 'slug' => $post->post_name, 'deleted' => (bool) $deleted ) );
	return;
} else {
	throw new InvalidArgumentException( 'Unsupported lifecycle action.' );
}

p6_lifecycle_output( get_post( $post->ID ) );
