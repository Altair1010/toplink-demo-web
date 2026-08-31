<?php

namespace Toplink\ContentModel;

final class SchemaRegistry {
	public const PUBLIC_DOMAINS = [ 'Service', 'Product', 'Article', 'Media', 'SiteSettings' ];
	public const FACT_STATUSES = [ 'APPROVED', 'PENDING', 'REJECTED', 'REFERENCE_ONLY' ];
	public const LIFECYCLES = [ 'draft', 'in_review', 'approved', 'published' ];
	public const ARTICLE_TYPES = [ 'knowledge', 'news', 'operational_update', 'customer_story' ];
	public const MEDIA_ROLES = [ 'orientation', 'evidence', 'explanation', 'atmosphere' ];
	public const IDENTITY_CLASSES = [ 'actual_toplink', 'generic_stock', 'abstract' ];

	public static function domains(): array {
		return array(
			'Service'      => self::service_fields(),
			'Product'      => self::product_fields(),
			'Article'      => self::article_fields(),
			'Media'        => self::media_fields(),
			'SiteSettings' => self::settings_fields(),
		);
	}

	public static function post_type_domain( string $post_type ): ?string {
		return array(
			'service'    => 'Service',
			'product'    => 'Product',
			'post'       => 'Article',
			'attachment' => 'Media',
		)[ $post_type ] ?? null;
	}

	public static function fields_for_post_type( string $post_type ): array {
		$domain = self::post_type_domain( $post_type );
		return $domain ? self::domains()[ $domain ] : array();
	}

	public static function article_category_map(): array {
		return array(
			'kien-thuc'                  => 'knowledge',
			'tin-tuc'                    => 'news',
			'operational-update'          => 'operational_update',
			'cau-chuyen-khach-hang'      => 'customer_story',
		);
	}

	private static function field(
		string $storage,
		string $owner,
		bool $required,
		string $type,
		bool $source_required = true,
		bool $rest = true,
		string $sanitize = 'sanitize_text_field',
		array $enum = array()
	): array {
		return compact( 'storage', 'owner', 'required', 'type', 'source_required', 'rest', 'sanitize', 'enum' ) + array(
			'fact_status_required' => true,
		);
	}

	private static function system_field( string $storage, bool $required, string $type ): array {
		return self::field( $storage, 'SYSTEM', $required, $type, false, true, 'sanitize_text_field' ) + array(
			'derived' => true,
		);
	}

	private static function service_fields(): array {
		return array(
			'title'                   => self::field( 'post_title', 'BUSINESS', true, 'string' ),
			'slug'                    => self::system_field( 'post_name', true, 'string' ),
			'summary'                 => self::field( 'post_excerpt', 'EDITORIAL', true, 'string', true, true, 'sanitize_textarea_field' ),
			'service_group'           => self::field( 'taxonomy:service_group', 'BUSINESS', true, 'string' ),
			'body'                    => self::field( 'post_content', 'EDITORIAL', true, 'blocks', true, true, 'wp_kses_post' ),
			'who_it_may_fit'          => self::field( 'meta:who_it_may_fit', 'BUSINESS', true, 'string_list', true, true, 'sanitize_textarea_field' ),
			'limitations_cautions'    => self::field( 'meta:limitations_cautions', 'BUSINESS', true, 'string_list', true, true, 'sanitize_textarea_field' ),
			'professional_evaluation' => self::field( 'meta:professional_evaluation', 'BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
			'experience_process'      => self::field( 'meta:experience_process', 'BUSINESS', true, 'string_list', true, true, 'sanitize_textarea_field' ),
			'faq'                     => self::field( 'meta:faq', 'EDITORIAL', false, 'faq', true, true, 'sanitize_textarea_field' ),
			'media'                   => self::field( 'meta:media', 'MEDIA', false, 'id_list', true, true, 'sanitize_text_field' ),
			'related_knowledge'       => self::field( 'meta:related_knowledge', 'SYSTEM', false, 'id_list', false, true, 'sanitize_text_field' ),
			'display_order'           => self::system_field( 'menu_order', true, 'integer' ),
			'seo'                     => self::field( 'meta:seo', 'EDITORIAL/SYSTEM', true, 'seo', true, true, 'sanitize_textarea_field' ),
			'evidence_state'          => self::field( 'meta:evidence_state', 'BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
		);
	}

	private static function product_fields(): array {
		return array(
			'title'                    => self::field( 'post_title', 'BUSINESS', true, 'string' ),
			'slug'                     => self::system_field( 'post_name', true, 'string' ),
			'summary'                  => self::field( 'post_excerpt', 'EDITORIAL', true, 'string', true, true, 'sanitize_textarea_field' ),
			'safe_positioning'         => self::field( 'meta:safe_positioning', 'BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
			'supported_use_statements' => self::field( 'meta:supported_use_statements', 'BUSINESS', true, 'string_list', true, true, 'sanitize_textarea_field' ),
			'limitations_cautions'     => self::field( 'meta:limitations_cautions', 'BUSINESS', true, 'string_list', true, true, 'sanitize_textarea_field' ),
			'documentation_status'     => self::field( 'meta:documentation_status', 'BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
			'body'                     => self::field( 'post_content', 'EDITORIAL', true, 'blocks', true, true, 'wp_kses_post' ),
			'faq'                      => self::field( 'meta:faq', 'EDITORIAL', false, 'faq', true, true, 'sanitize_textarea_field' ),
			'media'                    => self::field( 'meta:media', 'MEDIA', false, 'id_list', true, true, 'sanitize_text_field' ),
			'related_knowledge'        => self::field( 'meta:related_knowledge', 'SYSTEM', false, 'id_list', false, true, 'sanitize_text_field' ),
			'seo'                      => self::field( 'meta:seo', 'EDITORIAL/SYSTEM', true, 'seo', true, true, 'sanitize_textarea_field' ),
			'evidence_state'           => self::field( 'meta:evidence_state', 'BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
		);
	}

	private static function article_fields(): array {
		return array(
			'title'                    => self::field( 'post_title', 'EDITORIAL', true, 'string' ),
			'slug'                     => self::system_field( 'post_name', true, 'string' ),
			'summary'                  => self::field( 'post_excerpt', 'EDITORIAL', true, 'string', true, true, 'sanitize_textarea_field' ),
			'body'                     => self::field( 'post_content', 'EDITORIAL', true, 'blocks', true, true, 'wp_kses_post' ),
			'article_type'             => self::field( 'taxonomy:category', 'EDITORIAL', true, 'enum', true, true, 'sanitize_key', self::ARTICLE_TYPES ),
			'author'                   => self::system_field( 'post_author', true, 'string' ),
			'published_at'             => self::system_field( 'post_date', true, 'datetime' ),
			'updated_at'               => self::system_field( 'post_modified', false, 'datetime' ),
			'featured_media'           => self::field( 'featured_media', 'MEDIA', false, 'media', true ),
			'related_services'         => self::field( 'meta:related_services', 'SYSTEM', false, 'id_list', false, true, 'sanitize_text_field' ),
			'related_articles'         => self::field( 'meta:related_articles', 'SYSTEM', false, 'id_list', false, true, 'sanitize_text_field' ),
			'evidence_reference_state' => self::field( 'meta:evidence_reference_state', 'EDITORIAL/BUSINESS', true, 'string', true, true, 'sanitize_textarea_field' ),
			'seo'                      => self::field( 'meta:seo', 'EDITORIAL/SYSTEM', true, 'seo', true, true, 'sanitize_textarea_field' ),
		);
	}

	private static function media_fields(): array {
		return array(
			'asset'                 => self::system_field( 'attachment', true, 'asset' ),
			'source_provenance'     => self::field( 'meta:source_provenance', 'MEDIA', true, 'string', true, true, 'sanitize_textarea_field' ),
			'authorization'         => self::field( 'meta:authorization', 'MEDIA', true, 'string', true, true, 'sanitize_textarea_field' ),
			'alt_text'              => self::field( 'meta:_wp_attachment_image_alt', 'MEDIA/EDITORIAL', true, 'string' ),
			'caption'               => self::field( 'post_excerpt', 'EDITORIAL', false, 'string', true, true, 'sanitize_textarea_field' ),
			'media_role'            => self::field( 'meta:media_role', 'MEDIA', true, 'enum', true, true, 'sanitize_key', self::MEDIA_ROLES ),
			'identity_class'        => self::field( 'meta:identity_class', 'MEDIA', true, 'enum', true, true, 'sanitize_key', self::IDENTITY_CLASSES ),
			'publishability_status' => self::field( 'meta:publishability_status', 'MEDIA', true, 'string' ),
		);
	}

	private static function settings_fields(): array {
		return array(
			'public_display_name'  => self::field( 'option:public_display_name', 'BUSINESS', true, 'string' ),
			'address'              => self::field( 'option:address', 'BUSINESS', false, 'nullable_string', true, true, 'sanitize_textarea_field' ),
			'opening_hours'        => self::field( 'option:opening_hours', 'BUSINESS', false, 'nullable_string', true, true, 'sanitize_textarea_field' ),
			'hotline'              => self::field( 'option:hotline', 'BUSINESS', false, 'nullable_string' ),
			'zalo_destination'     => self::field( 'option:zalo_destination', 'BUSINESS', false, 'nullable_string', true, true, 'esc_url_raw' ),
			'facebook_destination' => self::field( 'option:facebook_destination', 'BUSINESS', false, 'nullable_string', true, true, 'esc_url_raw' ),
			'social_links'         => self::field( 'option:social_links', 'BUSINESS', false, 'string_list', true, true, 'sanitize_textarea_field' ),
			'legal_identifiers'    => self::field( 'option:legal_identifiers', 'BUSINESS', false, 'string_list', true, true, 'sanitize_textarea_field' ),
		);
	}
}
