<?php

/**
 * Plugin Name:     Image Comparison
 * Plugin URI:      https://essential-blocks.com
 * Description:     Let the visitors compare images & make your website interactive.
 * Version:         1.4.0
 * Author:          WPDeveloper
 * Author URI:      https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     image-comparison
 * Requires at least: 6.0
 * Tested up to:    7.1
 * Requires PHP:    7.4
 *
 * @package         image-comparison
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

if ( ! defined( 'EB_IMAGE_COMPARISON_BLOCKS_VERSION' ) ) {
    define( 'EB_IMAGE_COMPARISON_BLOCKS_VERSION', '1.4.0' );
}
if ( ! defined( 'EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL' ) ) {
    define( 'EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL', plugin_dir_url( __FILE__ ) );
}
if ( ! defined( 'EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH' ) ) {
    define( 'EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH', dirname( __FILE__ ) );
}

require_once __DIR__ . '/includes/helpers.php';
require_once __DIR__ . '/includes/font-loader.php';

/**
 * `lib/style-handler` is a git submodule. A clone without `--recurse-submodules`
 * leaves the directory empty, which turns an unconditional require into a fatal.
 */
if ( file_exists( __DIR__ . '/lib/style-handler/style-handler.php' ) ) {
    require_once __DIR__ . '/lib/style-handler/style-handler.php';
}

function create_block_image_comparison_block_init() {

    /**
     * Both files are required for the editor script: the .asset.php carries the
     * dependency list, the .js is the bundle itself. If either is missing the
     * block would register server-side with no editor script and silently never
     * show up in the inserter, so check for both.
     */
    $script_asset_path = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH . '/dist/index.asset.php';
    $script_file_path  = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH . '/dist/index.js';
    $script_asset      = null;
    if ( file_exists( $script_asset_path ) && file_exists( $script_file_path ) ) {
        $script_asset = require $script_asset_path;
    }

    if ( is_array( $script_asset ) ) {
        $index_js         = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . 'dist/index.js';
        $asset_deps       = isset( $script_asset['dependencies'] ) && is_array( $script_asset['dependencies'] ) ? $script_asset['dependencies'] : array();
        $all_dependencies = array_merge( $asset_deps, array(
            'wp-blocks',
            'wp-i18n',
            'wp-element',
            'wp-block-editor',
            'lodash',
            'eb-image-comparison-blocks-controls-util',
            'essential-blocks-eb-animation'
        ) );

        wp_register_script(
            'image-comparison-block-editor-js',
            $index_js,
            $all_dependencies,
            isset( $script_asset['version'] ) ? $script_asset['version'] : EB_IMAGE_COMPARISON_BLOCKS_VERSION
        );
    }

    $load_animation_js = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . 'assets/js/eb-animation-load.js';
    wp_register_script(
        'essential-blocks-eb-animation',
        $load_animation_js,
        array(),
        EB_IMAGE_COMPARISON_BLOCKS_VERSION,
        true
    );

    $animate_css = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . 'assets/css/animate.min.css';
    wp_register_style(
        'essential-blocks-animation',
        $animate_css,
        array(),
        EB_IMAGE_COMPARISON_BLOCKS_VERSION
    );

    $frontend_asset_path = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH . '/dist/frontend/index.asset.php';
    $frontend_asset      = null;
    if ( file_exists( $frontend_asset_path ) ) {
        $frontend_asset = require $frontend_asset_path;
    }
    $frontend_js = 'dist/frontend/index.js';
    wp_register_script(
        'eb-image-comparison-frontend',
        plugins_url( $frontend_js, __FILE__ ),
        array( 'wp-element', 'essential-blocks-eb-animation' ),
        is_array( $frontend_asset ) && isset( $frontend_asset['version'] ) ? $frontend_asset['version'] : EB_IMAGE_COMPARISON_BLOCKS_VERSION,
        true
    );

    if ( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/image-comparison' ) ) {
        $block_args = array(
            'render_callback' => function ( $attributes, $content ) {
                if ( ! is_admin() ) {
                    wp_enqueue_style( 'essential-blocks-animation' );
                    wp_enqueue_script( 'eb-image-comparison-frontend' );
                }
                return $content;
            }
        );

        if ( is_array( $script_asset ) ) {
            $block_args['editor_script'] = 'image-comparison-block-editor-js';
        }

        register_block_type(
            Image_Comparison_Helper::get_block_register_path( 'image-comparison/image-comparison', EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH ),
            $block_args
        );
    }
}

add_action( 'init', 'create_block_image_comparison_block_init' );
