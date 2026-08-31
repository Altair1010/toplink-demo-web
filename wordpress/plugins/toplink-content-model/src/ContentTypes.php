<?php

namespace Toplink\ContentModel;

final class ContentTypes {
	public static function register(): void {
		register_post_type( 'service', self::post_type_args( 'Dịch vụ', 'Dịch vụ', 'toplink_service', 'toplink_services', true ) );
		register_post_type( 'product', self::post_type_args( 'Sản phẩm', 'Sản phẩm', 'toplink_product', 'toplink_products', false ) );

		register_taxonomy( 'service_group', array( 'service' ), array(
			'labels'            => array( 'name' => 'Nhóm dịch vụ', 'singular_name' => 'Nhóm dịch vụ' ),
			'public'            => true,
			'show_in_rest'      => true,
			'show_admin_column' => true,
			'hierarchical'      => true,
		) );

		self::register_meta();
	}

	private static function post_type_args( string $name, string $singular, string $capability, string $capabilities, bool $page_attributes ): array {
		$supports = array( 'title', 'editor', 'excerpt', 'author', 'revisions', 'thumbnail' );
		if ( $page_attributes ) {
			$supports[] = 'page-attributes';
		}

		return array(
			'labels'          => array( 'name' => $name, 'singular_name' => $singular ),
			'public'          => true,
			'show_in_rest'    => true,
			'has_archive'     => false,
			'rewrite'         => false,
			'supports'        => $supports,
			'capability_type' => array( $capability, $capabilities ),
			'map_meta_cap'    => true,
		);
	}

	private static function register_meta(): void {
		foreach ( array( 'service', 'product', 'post', 'attachment' ) as $post_type ) {
			register_post_meta( $post_type, '_toplink_editorial_lifecycle', array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => false,
				'sanitize_callback' => 'sanitize_key',
				'auth_callback'     => static fn (): bool => current_user_can( 'edit_posts' ),
			) );
			register_post_meta( $post_type, '_toplink_field_governance', array(
				'type'          => 'object',
				'single'        => true,
				'show_in_rest'  => false,
				'auth_callback' => static fn (): bool => current_user_can( 'edit_posts' ),
			) );
			foreach ( SchemaRegistry::fields_for_post_type( $post_type ) as $field => $definition ) {
				if ( str_starts_with( $definition['storage'], 'meta:' ) && '_wp_attachment_image_alt' !== substr( $definition['storage'], 5 ) ) {
					register_post_meta( $post_type, substr( $definition['storage'], 5 ), array(
						'type'          => in_array( $definition['type'], array( 'string_list', 'id_list', 'faq', 'seo' ), true ) ? 'object' : 'string',
						'single'        => true,
						'show_in_rest'  => false,
						'auth_callback' => static fn (): bool => current_user_can( 'edit_posts' ),
					) );
				}
			}
		}
	}

	public static function ensure_article_categories(): void {
		$names = array(
			'kien-thuc'             => 'Kiến thức',
			'tin-tuc'               => 'Tin tức',
			'operational-update'     => 'Cập nhật vận hành',
			'cau-chuyen-khach-hang' => 'Câu chuyện khách hàng',
		);
		foreach ( $names as $slug => $name ) {
			if ( ! term_exists( $slug, 'category' ) ) {
				wp_insert_term( $name, 'category', array( 'slug' => $slug ) );
			}
		}
	}
}
