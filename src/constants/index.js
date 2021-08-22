const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const CONTENT_POSITION = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

export const HORIZONTAL_LABEL_POSITION = [
	{ label: __("Top"), value: "top" },
	{ label: __("Center"), value: "center" },
	{ label: __("Bottom"), value: "bottom" },
];

export const VERTICAL_LABEL_POSITION = [
	{ label: __("Left"), value: "left" },
	{ label: __("Center"), value: "center" },
	{ label: __("Right"), value: "right" },
];

export const IMAGE_WIDTH = "imgWidth";

// dimension control
export const WRAPPER_MARGIN = "wrpMargin";
export const WRAPPER_PADDING = "wrpPadding";
export const LABEL_PADDING = "lblPadding";
