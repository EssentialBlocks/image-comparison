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

  $frontend_js = 'build/frontend.js';
  wp_register_script(
    'eb-image-comparison-frontend',
    plugins_url($frontend_js, __FILE__),
    array("wp-element"),
    filemtime("$dir/$frontend_js"),
    true,
  );


  if (!WP_Block_Type_Registry::get_instance()->is_registered('essential-blocks/image-comparison')) {
    register_block_type('image-comparison/image-comparison', array(
      'editor_script' => 'eb-image-comparison-block-editor',
      'editor_style'  => 'eb-image-comparison-block-editor',
      'render_callback' => function ($attributes, $content) {
        if (!is_admin()) {
          wp_enqueue_script('eb-image-comparison-frontend');
        }
        return $content;
      }
    ));
  }
}
add_action('init', 'create_block_image_comparison_block_init');
