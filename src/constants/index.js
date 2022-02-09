import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

export const CONTENT_POSITION = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

export const HORIZONTAL_LABEL_POSITION = [
	{ label: __("Top", "image-comparison"), value: "top" },
	{ label: __("Center", "image-comparison"), value: "center" },
	{ label: __("Bottom", "image-comparison"), value: "bottom" },
];

export const VERTICAL_LABEL_POSITION = [
	{ label: __("Left", "image-comparison"), value: "left" },
	{ label: __("Center", "image-comparison"), value: "center" },
	{ label: __("Right", "image-comparison"), value: "right" },
];

export const IMAGE_WIDTH = "imgWidth";

// dimension control
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const LABEL_PADDING = "lblPadding";
