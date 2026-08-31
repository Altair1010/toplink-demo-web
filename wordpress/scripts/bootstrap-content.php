<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit( 1 );
}

\Toplink\ContentModel\ContentTypes::ensure_article_categories();
\Toplink\ContentModel\Roles::ensure_capabilities();

$users = array(
	array( getenv( 'TOPLINK_WP_AUTHOR_USER' ), getenv( 'TOPLINK_WP_AUTHOR_PASSWORD' ), 'author', 'P5 Author' ),
	array( getenv( 'TOPLINK_WP_EDITOR_USER' ), getenv( 'TOPLINK_WP_EDITOR_PASSWORD' ), 'editor', 'P5 Editor' ),
);
foreach ( $users as [ $username, $password, $role, $display_name ] ) {
	$user_id = username_exists( $username );
	if ( ! $user_id ) {
		$user_id = wp_create_user( $username, $password, $username . '@toplink.invalid' );
	}
	if ( ! is_wp_error( $user_id ) ) {
		$user = new WP_User( $user_id );
		$user->set_role( $role );
		wp_update_user( array( 'ID' => $user_id, 'display_name' => $display_name ) );
	}
}

echo "Toplink roles, users and categories are present.\n";
