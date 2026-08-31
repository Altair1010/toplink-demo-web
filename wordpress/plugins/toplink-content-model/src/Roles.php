<?php

namespace Toplink\ContentModel;

final class Roles {
	private const CPT_SUFFIXES = array( 'toplink_service', 'toplink_product' );

	public static function ensure_capabilities(): void {
		$author = get_role( 'author' );
		$editor = get_role( 'editor' );
		$admin  = get_role( 'administrator' );
		if ( ! $author || ! $editor || ! $admin ) {
			return;
		}

		$author->remove_cap( 'publish_posts' );
		foreach ( self::all_cpt_caps() as $capability ) {
			$author->remove_cap( $capability );
			$editor->add_cap( $capability );
			$admin->add_cap( $capability );
		}
		foreach ( self::AUTHOR_CPT_CAPS() as $capability ) {
			$author->add_cap( $capability );
		}
		$editor->add_cap( 'manage_toplink_settings' );
		$admin->add_cap( 'manage_toplink_settings' );
	}

	private static function AUTHOR_CPT_CAPS(): array {
		$caps = array();
		foreach ( self::CPT_SUFFIXES as $singular ) {
			$plural = $singular . 's';
			$caps[] = 'edit_' . $singular;
			$caps[] = 'read_' . $singular;
			$caps[] = 'delete_' . $singular;
			$caps[] = 'edit_' . $plural;
			$caps[] = 'delete_' . $plural;
		}
		return $caps;
	}

	private static function all_cpt_caps(): array {
		$caps = array();
		foreach ( self::CPT_SUFFIXES as $singular ) {
			$plural = $singular . 's';
			foreach ( array(
				'edit_' . $singular,
				'read_' . $singular,
				'delete_' . $singular,
				'edit_' . $plural,
				'edit_others_' . $plural,
				'publish_' . $plural,
				'read_private_' . $plural,
				'delete_' . $plural,
				'delete_private_' . $plural,
				'delete_published_' . $plural,
				'delete_others_' . $plural,
				'edit_private_' . $plural,
				'edit_published_' . $plural,
			) as $capability ) {
				$caps[] = $capability;
			}
		}
		return array_values( array_unique( $caps ) );
	}
}
