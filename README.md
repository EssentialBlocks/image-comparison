# Image Comparison

Let your visitors compare images and make your website interactive — a standalone Gutenberg block plugin by [WPDeveloper](https://wpdeveloper.com), part of the [Essential Blocks](https://essential-blocks.com) family.

[![WordPress](https://img.shields.io/badge/WordPress-6.0%20–%207.1-blue.svg)](https://wordpress.org/plugins/image-comparison/)
[![PHP](https://img.shields.io/badge/PHP-7.4%20–%208.5-777bb4.svg)](https://www.php.net/)
[![License](https://img.shields.io/badge/license-GPL--3.0--or--later-green.svg)](https://www.gnu.org/licenses/gpl-3.0.html)

## About

Image Comparison adds a before/after slider to the WordPress block editor. Drop in two images, then control the slider handle, orientation, hover behaviour, labels, colors and spacing from the block sidebar. Handy for WooCommerce stores, portfolios, and any before/after showcase.

The front-end slider is powered by [`react-compare-image`](https://github.com/junkboy0315/react-compare-image).

## Features

- **Completely customizable** — images, size, colors, labels, and typography
- **Vertical & horizontal** comparison modes
- **Slider on hover** or drag-to-compare
- **Super light-weight** — no extra resources, optimized for fast loading and instant live editing
- **Native block editor experience** — full inspector controls with responsive settings

## Requirements

| | Minimum | Tested up to |
| --- | --- | --- |
| WordPress | 6.0 | 7.1 |
| PHP | 7.4 | 8.5 |

## Installation

### From the block editor

1. Open the WordPress Block (Gutenberg) editor
2. Search for **Image Comparison**
3. Install in one click

### Manual

1. Upload `image-comparison` to `/wp-content/plugins/`
2. Activate the plugin through the **Plugins** menu in WordPress
3. Follow the [documentation](https://essential-blocks.com/docs/)

## Development

This repository uses two git submodules. **Clone with them, or the build and the plugin will both be incomplete:**

```bash
git clone --recurse-submodules git@github.com:EssentialBlocks/image-comparison.git
# already cloned?
git submodule update --init --recursive
```

| Submodule | Path | Purpose |
| --- | --- | --- |
| `controls` | `controls/` | Shared Essential Blocks inspector controls |
| `style-handler` | `lib/style-handler/` | Front-end CSS generation |

Install dependencies and build:

```bash
npm install       # install dependencies
npm run start     # development build with watch
npm run build     # production build
npm run lint:js   # lint JavaScript
npm run lint:css  # lint styles
npm run format:js # format source
```

Built with [`@wordpress/scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/). `webpack.config.js` builds two entries — `dist/index.js` (editor) and `dist/frontend/index.js` (front end) — plus `dist/style.css`.

`CleanWebpackPlugin` is filtered out of the config on purpose: `dist/controls.js` and `dist/controls.css` are vendored artifacts produced by the central Essential Blocks pipeline, not by this repository's build. Deleting `dist/` removes them with no way to regenerate them here.

Source lives in `src/`, shared controls in `controls/`, and the PHP entry point is `image-comparison.php`.

### Packaging a release

Zips are produced with [`wp dist-archive`](https://github.com/wp-cli/dist-archive-command), which honours `.distignore`:

```bash
wp package install wp-cli/dist-archive-command   # once
wp dist-archive . ../image-comparison.zip
```

## Branches

| Branch | Purpose |
| --- | --- |
| `master` | Stable, released code. Default branch. |
| `latest` | Staging for the next release. |
| `dev` | Active development. Open pull requests against this branch. |

## Contributing

Issues and pull requests are welcome at [EssentialBlocks/image-comparison](https://github.com/EssentialBlocks/image-comparison). Please branch off `dev` and target `dev` with your pull request.

## Contributors

- [wpdevteam](https://profiles.wordpress.org/wpdevteam/) — WPDeveloper
- [re_enter_rupok](https://profiles.wordpress.org/re_enter_rupok/)
- [Asif2BD](https://profiles.wordpress.org/asif2bd/)
- [fencermonir](https://profiles.wordpress.org/fencermonir/)
- [rahat89](https://profiles.wordpress.org/rahat89/)
- [RahatSheikhLeon](https://github.com/RahatSheikhLeon)

## Support

- [Documentation](https://essential-blocks.com/docs/)
- [Support forum](https://wordpress.org/support/plugin/image-comparison/)
- [Report an issue](https://github.com/EssentialBlocks/image-comparison/issues)

## License

GPL-3.0-or-later — see [the licence text](https://www.gnu.org/licenses/gpl-3.0.html).
