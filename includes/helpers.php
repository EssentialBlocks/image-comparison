<?php

/**
 * Load google fonts.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Image_Comparison_Helper
{

    private static $instance;

    /**
     * Registers the plugin.
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * The Constructor.
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }

    /**
     * Load fonts.
     *
     * @access public
     */
    public function enqueues($hook)
    {
        global $pagenow;

        /**
         * Only for admin add/edit pages/posts
         */
        $query_string = isset($_SERVER['QUERY_STRING']) ? sanitize_text_field(wp_unslash($_SERVER['QUERY_STRING'])) : '';

        if ($pagenow == 'post-new.php' || $pagenow == 'post.php' || $pagenow == 'site-editor.php' || ($pagenow == 'themes.php' && !empty($query_string) && strpos($query_string, 'gutenberg-edit-site') !== false)) {

            $controls_asset_path = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH . '/dist/controls.asset.php';
            if (!file_exists($controls_asset_path)) {
                return;
            }

            $controls_dependencies = require $controls_asset_path;
            if (!is_array($controls_dependencies)) {
                return;
            }

            $controls_deps    = isset($controls_dependencies['dependencies']) && is_array($controls_dependencies['dependencies']) ? $controls_dependencies['dependencies'] : array();
            $controls_version = isset($controls_dependencies['version']) ? $controls_dependencies['version'] : EB_IMAGE_COMPARISON_BLOCKS_VERSION;

            wp_register_script(
                "eb-image-comparison-blocks-controls-util",
                EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . '/dist/controls.js',
                $controls_deps,
                $controls_version,
                true
            );

            wp_localize_script('eb-image-comparison-blocks-controls-util', 'EssentialBlocksLocalize', array(
                'eb_wp_version' => (float) get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
            ));

            if ($pagenow == 'post-new.php' || $pagenow == 'post.php') {
                wp_localize_script('eb-image-comparison-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-post'
                ));
            } else if ($pagenow == 'site-editor.php' || $pagenow == 'themes.php') {
                wp_localize_script('eb-image-comparison-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-site'
                ));
            }

            /**
             * Every Essential Blocks standalone plugin registers the same
             * `editor.BlockEdit` / `essential-blocks/global` filter from its own
             * bundled copy of the controls library. @wordpress/hooks stacks
             * same-namespace handlers instead of replacing them, so with more
             * than one of these plugins active the advanced-controls HOC wraps
             * each block repeatedly and the copies loop against each other until
             * React aborts with "Maximum update depth exceeded". Keep one.
             */
            wp_enqueue_script(
                'eb-image-comparison-global-filter-dedupe',
                EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . 'assets/js/eb-global-filter-dedupe.js',
                array('wp-hooks', 'wp-dom-ready'),
                EB_IMAGE_COMPARISON_BLOCKS_VERSION,
                true
            );

            /**
             * `$controls_version` is the hash of the *script* build, so a
             * stylesheet-only change ships under an unchanged `?ver=` and every
             * browser keeps serving the cached copy. Version the stylesheet by
             * its own mtime so CSS fixes actually reach the editor.
             */
            $controls_css_path    = EB_IMAGE_COMPARISON_BLOCKS_ADMIN_PATH . '/dist/controls.css';
            $controls_css_version = file_exists($controls_css_path) ? (string) filemtime($controls_css_path) : $controls_version;

            wp_enqueue_style(
                'essential-blocks-editor-css',
                EB_IMAGE_COMPARISON_BLOCKS_ADMIN_URL . '/dist/controls.css',
                array('essential-blocks-animation'),
                $controls_css_version,
                'all'
            );
        }
    }
    public static function get_block_register_path($blockname, $blockPath)
    {
        /**
         * A float cast breaks on two-digit minors ("5.10" casts to 5.1) and on
         * majors above 9, so the comparison is done with version_compare().
         * `< 5.7` is the exact equivalent of the original `<= 5.6` intent.
         */
        if (version_compare(get_bloginfo('version'), '5.7', '<')) {
            return $blockname;
        } else {
            return $blockPath;
        }
    }
}
Image_Comparison_Helper::register();
