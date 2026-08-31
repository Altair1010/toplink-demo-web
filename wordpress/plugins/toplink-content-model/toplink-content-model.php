<?php
/**
 * Plugin Name: Toplink Content Model
 * Description: Mô hình nội dung, quy trình biên tập và REST contract an toàn cho Toplink V1.
 * Version: 0.2.0
 * Requires at least: 7.1
 * Requires PHP: 8.2
 * Author: Y Viện Toplink
 * License: GPL-2.0-or-later
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'TOPLINK_CONTENT_MODEL_VERSION', '0.2.0' );
define( 'TOPLINK_CONTENT_MODEL_FILE', __FILE__ );

require_once __DIR__ . '/src/SchemaRegistry.php';
require_once __DIR__ . '/src/ContentTypes.php';
require_once __DIR__ . '/src/Roles.php';
require_once __DIR__ . '/src/AdminUi.php';
require_once __DIR__ . '/src/PublicationGates.php';
require_once __DIR__ . '/src/IntegrationAuth.php';
require_once __DIR__ . '/src/RestApi.php';
require_once __DIR__ . '/src/IntegrationEvents.php';
require_once __DIR__ . '/src/Preview.php';

use Toplink\ContentModel\AdminUi;
use Toplink\ContentModel\ContentTypes;
use Toplink\ContentModel\PublicationGates;
use Toplink\ContentModel\RestApi;
use Toplink\ContentModel\Roles;
use Toplink\ContentModel\IntegrationEvents;
use Toplink\ContentModel\Preview;

add_action( 'init', array( ContentTypes::class, 'register' ) );
add_action( 'init', array( Roles::class, 'ensure_capabilities' ), 20 );
add_action( 'admin_init', array( AdminUi::class, 'register' ) );
add_action( 'admin_menu', array( AdminUi::class, 'register_settings_page' ) );
add_action( 'rest_api_init', array( RestApi::class, 'register_routes' ) );
add_filter( 'wp_insert_post_data', array( PublicationGates::class, 'guard_transition' ), 20, 4 );
add_action( 'save_post', array( PublicationGates::class, 'enforce_published_state' ), 50, 3 );
add_action( 'wp_after_insert_post', array( PublicationGates::class, 'mark_published' ), 20, 3 );
add_action( 'admin_notices', array( PublicationGates::class, 'render_notice' ) );
add_action( 'transition_post_status', array( IntegrationEvents::class, 'transition' ), 30, 3 );
add_action( 'post_updated', array( IntegrationEvents::class, 'updated' ), 30, 3 );
add_action( 'before_delete_post', array( IntegrationEvents::class, 'before_delete' ), 20, 2 );
add_action( 'add_attachment', array( IntegrationEvents::class, 'attachment_updated' ) );
add_action( 'edit_attachment', array( IntegrationEvents::class, 'attachment_updated' ) );
add_action( 'updated_option', array( IntegrationEvents::class, 'option_updated' ), 20, 1 );
add_filter( 'preview_post_link', array( Preview::class, 'filter_link' ), 20, 2 );

register_activation_hook(
	__FILE__,
	static function (): void {
		ContentTypes::register();
		Roles::ensure_capabilities();
		ContentTypes::ensure_article_categories();
		flush_rewrite_rules();
	}
);
