<?php

/**
 * Plugin Name:     Image Comparison
 * Plugin URI:      https://essential-blocks.com
 * Description:     Let the visitors compare images & make your website interactive.
 * Version:         1.0.1
 * Author:          WPDeveloper
 * Author URI:      https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     image-comparison
 *
 * @package         image-comparison
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
define('IMAGE_COMPARISON_DIR', dirname(__FILE__));

require_once __DIR__ . '/includes/admin-enqueue.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_image_comparison_block_init()
{
  $dir = dirname(__FILE__);

  $script_asset_path = "$dir/build/index.asset.php";
  if (!file_exists($script_asset_path)) {
    throw new Error(
      'You need to run `npm start` or `npm run build` for the "block/image-comparison" block first.'
    );
  }
  $index_js     = 'build/index.js';
  wp_register_script(
    'eb-image-comparison-block-editor',
    plugins_url($index_js, __FILE__),
    array(
      'wp-blocks',
      'wp-i18n',
      'wp-element',
      'wp-block-editor'
    ),
    filemtime("$dir/$index_js")
  );

  $editor_css = 'build/index.css';
  wp_register_style(
    'eb-image-comparison-block-editor',
    plugins_url($editor_css, __FILE__),
    array(),
    filemtime("$dir/$editor_css")
  );

  // $style_css = 'build/style-index.css';
  // wp_register_style(
  // 	'eb-image-comparison-block',
  // 	plugins_url( $style_css, __FILE__ ),
  // 	array(),
  // 	filemtime( "$dir/$style_css" )
  // );

  $image_viewer_css = 'assets/css/image-compare-viewer.css';
  wp_register_style(
    'eb-image-comparison-viewer-css',
    plugins_url($image_viewer_css, __FILE__),
    array(),
    filemtime("$dir/$image_viewer_css"),
    "all"
  );


  $image_viewer = 'assets/js/image-compare-viewer.min.js';
  wp_register_script(
    'eb-image-comparison-viewer',
    plugins_url($image_viewer, __FILE__),
    array(),
    filemtime("$dir/$image_viewer"),
    true
  );


  $frontend_js = 'assets/js/frontend.js';
  wp_register_script(
    'eb-image-comparison-frontend',
    plugins_url($frontend_js, __FILE__),
    array(),
    filemtime("$dir/$frontend_js"),
    true,
  );


  if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/image-comparison')) {
    register_block_type('block/image-comparison', array(
      'editor_script' => 'eb-image-comparison-block-editor',
      'editor_style'  => 'eb-image-comparison-block-editor',
      //   'style'         => 'eb-image-comparison-block',
      'render_callback' => function ($attributes, $content) {
        if (!is_admin()) {
          wp_enqueue_style("eb-image-comparison-viewer-css");
          wp_enqueue_script('eb-image-comparison-viewer');
          wp_enqueue_script('eb-image-comparison-frontend');
        }
        return $content;
      }
    ));
  }
}
add_action('init', 'create_block_image_comparison_block_init');
