<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

function toplink_seed_post( string $post_type, string $slug, string $title, string $category = '' ): int {
	$existing = get_page_by_path( $slug, OBJECT, $post_type );
	if ( $existing ) {
		return (int) $existing->ID;
	}
	$post_id = wp_insert_post( array(
		'post_type'    => $post_type,
		'post_status'  => 'draft',
		'post_name'    => $slug,
		'post_title'   => $title,
		'post_excerpt' => 'P5 FIXTURE — KHÔNG PHẢI NỘI DUNG SẢN XUẤT',
		'post_content' => 'P5 FIXTURE — KHÔNG PHẢI NỘI DUNG SẢN XUẤT. Chỉ dùng để kiểm tra workflow local.',
	), true );
	if ( is_wp_error( $post_id ) ) {
		throw new RuntimeException( $post_id->get_error_message() );
	}
	if ( $category ) {
		$term = get_term_by( 'slug', $category, 'category' );
		if ( $term ) {
			wp_set_post_terms( $post_id, array( $term->term_id ), 'category' );
		}
	}
	update_post_meta( $post_id, '_toplink_editorial_lifecycle', 'draft' );
	$governance = array();
	foreach ( \Toplink\ContentModel\SchemaRegistry::fields_for_post_type( $post_type ) as $key => $definition ) {
		if ( empty( $definition['derived'] ) ) {
			$governance[ $key ] = array( 'source' => 'P5 local fixture manifest', 'status' => 'REFERENCE_ONLY' );
		}
	}
	update_post_meta( $post_id, '_toplink_field_governance', $governance );
	return $post_id;
}

toplink_seed_post( 'service', 'p5-fixture-dich-vu', 'P5 FIXTURE — Dịch vụ không phải nội dung sản xuất' );
toplink_seed_post( 'product', 'p5-fixture-san-pham', 'P5 FIXTURE — Sản phẩm không phải nội dung sản xuất' );
toplink_seed_post( 'post', 'p5-fixture-bai-viet', 'P5 FIXTURE — Bài viết không phải nội dung sản xuất', 'kien-thuc' );

$values = (array) get_option( 'toplink_site_settings', array() );
$states = (array) get_option( 'toplink_site_settings_governance', array() );
if ( empty( $values['public_display_name'] ) ) {
	$values['public_display_name'] = 'Y Viện Toplink';
	$states['public_display_name'] = array( 'source' => 'DECISIONS.md D-001', 'status' => 'APPROVED' );
}
foreach ( array_keys( \Toplink\ContentModel\SchemaRegistry::domains()['SiteSettings'] ) as $key ) {
	if ( 'public_display_name' !== $key && ! isset( $states[ $key ] ) ) {
		$values[ $key ] = '';
		$states[ $key ] = array( 'source' => '', 'status' => 'PENDING' );
	}
}
update_option( 'toplink_site_settings', $values, false );
update_option( 'toplink_site_settings_governance', $states, false );
echo "Nonproduction P5 seed records are present.\n";
