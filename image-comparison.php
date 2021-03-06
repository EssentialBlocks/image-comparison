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
function create_block_image_comparison_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/image-comparison" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-image-comparison-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-image-comparison-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  $twenty_twenty_css = 'src/css/twentytwenty.css';
  wp_enqueue_style(
    'twenty-twenty-style',
    plugins_url($twenty_twenty_css, __FILE__),
    array()
  );

  $frontend_js = 'src/frontend.js';
  wp_enqueue_script(
    'essential-blocks-image-comparison-frontend',
    plugins_url($frontend_js, __FILE__),
    array( "jquery","wp-editor"),
    true
  );

  $image_loaded_js = "src/js/images-loaded.min.js";
  wp_enqueue_script(
    'essential-blocks-image-loaded',
    plugins_url($image_loaded_js, __FILE__),
    array("wp-editor","jquery"),
    true
  );

  $twenty_twenty_js ="src/js/jquery.twentytwenty.js" ;
  wp_enqueue_script(
    'essential-blocks-twenty-twenty',
    plugins_url($twenty_twenty_js, __FILE__),
    array("wp-editor","jquery"),
    true,
    true
  );

  $twenty_move = "src/js/jquery.event.move.js";
  wp_enqueue_script(
    'essential-blocks-twenty-move',
    plugins_url($twenty_move, __FILE__),
    array("wp-editor","jquery"),
    true
  );

	if( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/image-comparison' ) ) {
    register_block_type( 'block/image-comparison', array(
      'editor_script' => 'create-block-image-comparison-block-editor',
      'editor_style'  => 'create-block-image-comparison-block-editor',
      'style'         => 'create-block-image-comparison-block',
    ) );
  }
}
add_action( 'init', 'create_block_image_comparison_block_init' );
