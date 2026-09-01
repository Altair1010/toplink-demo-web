<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

$mode       = (string) getenv( 'P7_CONTACT_MODE' );
$value_key  = 'toplink_site_settings';
$state_key  = 'toplink_site_settings_governance';
$fields     = array( 'hotline', 'zalo_destination', 'facebook_destination' );
$test_source = '__P7_INTEGRATION_TEST__ local only';

if ( 'inspect' === $mode ) {
	$values = (array) get_option( $value_key, array() );
	$states = (array) get_option( $state_key, array() );
	foreach ( $fields as $field ) {
		$value  = trim( (string) ( $values[ $field ] ?? '' ) );
		$source = (string) ( $states[ $field ]['source'] ?? '' );
		if ( '' !== $value && $test_source !== $source ) {
			fwrite( STDERR, "Refusing to overwrite an existing {$field} value.\n" );
			exit( 3 );
		}
	}
	echo "P7_CONTACT_STATE=SAFE\n";
	exit( 0 );
}

if ( 'snapshot' === $mode ) {
	$snapshot = array(
		'values' => get_option( $value_key, array() ),
		'states' => get_option( $state_key, array() ),
	);
	echo 'P7_SNAPSHOT=' . base64_encode( serialize( $snapshot ) ) . "\n";
	exit( 0 );
}

if ( 'restore' === $mode ) {
	$encoded  = (string) getenv( 'P7_CONTACT_SNAPSHOT' );
	$decoded  = base64_decode( $encoded, true );
	$snapshot = false === $decoded ? false : unserialize( $decoded, array( 'allowed_classes' => false ) );
	if ( ! is_array( $snapshot ) || ! isset( $snapshot['values'], $snapshot['states'] ) ) {
		fwrite( STDERR, "Invalid P7 contact snapshot.\n" );
		exit( 4 );
	}
	update_option( $value_key, $snapshot['values'] );
	update_option( $state_key, $snapshot['states'] );
	echo "P7_CONTACT_STATE=RESTORED\n";
	exit( 0 );
}

if ( 'preview-id' === $mode ) {
	$post = get_page_by_path( 'p6-integration-test-preview-service', OBJECT, 'service' );
	if ( ! $post ) {
		fwrite( STDERR, "P6 preview record is unavailable.\n" );
		exit( 5 );
	}
	echo 'P7_PREVIEW_ID=' . (int) $post->ID . "\n";
	exit( 0 );
}

if ( ! in_array( $mode, array( 'pending', 'approved', 'invalid' ), true ) ) {
	fwrite( STDERR, "Unsupported P7 contact mode.\n" );
	exit( 2 );
}

$values = (array) get_option( $value_key, array() );
$states = (array) get_option( $state_key, array() );

if ( 'approved' === $mode ) {
	$values['hotline']              = '(024) 1234-5678';
	$values['zalo_destination']      = 'https://zalo.me/p7-integration-test';
	$values['facebook_destination']  = 'https://m.me/p7-integration-test';
} elseif ( 'invalid' === $mode ) {
	$values['hotline']              = 'not-a-phone';
	$values['zalo_destination']      = 'https://evil.example/p7';
	$values['facebook_destination']  = 'https://facebook.com.evil.example/p7';
} else {
	$values['hotline']              = null;
	$values['zalo_destination']      = null;
	$values['facebook_destination']  = null;
}

foreach ( $fields as $field ) {
	$states[ $field ] = array(
		'source' => $test_source,
		'status' => 'pending' === $mode ? 'PENDING' : 'APPROVED',
	);
}

update_option( $value_key, $values );
update_option( $state_key, $states );
echo 'P7_CONTACT_STATE=' . strtoupper( $mode ) . "\n";
