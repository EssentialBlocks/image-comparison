/**
 * Deduplicate the shared Essential Blocks global editor filter.
 *
 * Every Essential Blocks standalone plugin (image-comparison, flipbox,
 * price-table-block, infobox, …) bundles its own copy of the shared controls
 * library, and each copy runs:
 *
 *     addFilter( 'editor.BlockEdit', 'essential-blocks/global', withAdvancedControls );
 *
 * `@wordpress/hooks` does not deduplicate handlers that share a namespace — it
 * appends them. So with N of these plugins active, the same higher-order
 * component wraps every block N times:
 *
 *     WithAdvancedControls(WithAdvancedControls(...(Edit)))
 *
 * Each copy holds its own state and calls setAttributes in an effect, so the
 * copies retrigger each other until React throws
 * "Maximum update depth exceeded" (error #185) and the block editor replaces
 * the block with "This block has encountered an error and cannot be previewed."
 *
 * The copies are functionally identical, so keeping exactly one is safe and
 * restores the intended single-wrap behaviour.
 *
 * This runs on domReady, after every plugin's editor bundle has registered its
 * filters but before the block list renders. It is idempotent: if several
 * plugins ship this same shim, the later runs simply find nothing to remove.
 *
 * NOTE: the real fix belongs upstream in the shared `controls` package, which
 * should guard its registration with `wp.hooks.hasFilter()` instead of
 * registering unconditionally. This shim is a defensive workaround so the block
 * keeps working next to its sibling plugins in the meantime.
 */
( function ( wp ) {
    if ( ! wp || ! wp.hooks || typeof wp.domReady !== 'function' ) {
        return;
    }

    var HOOK_NAME = 'editor.BlockEdit';
    var NAMESPACE = 'essential-blocks/global';

    wp.domReady( function () {
        try {
            var store = wp.hooks.filters && wp.hooks.filters[ HOOK_NAME ];

            // Bail quietly if @wordpress/hooks ever changes its internal shape.
            if ( ! store || ! store.handlers || ! store.handlers.length ) {
                return;
            }

            var kept = false;
            var deduped = [];

            for ( var i = 0; i < store.handlers.length; i++ ) {
                var handler = store.handlers[ i ];

                if ( ! handler || handler.namespace !== NAMESPACE ) {
                    deduped.push( handler );
                    continue;
                }

                if ( ! kept ) {
                    kept = true;
                    deduped.push( handler );
                }
            }

            if ( deduped.length !== store.handlers.length ) {
                store.handlers = deduped;
            }
        } catch ( e ) {
            // Never let a defensive shim break the editor.
        }
    } );
} )( window.wp );
