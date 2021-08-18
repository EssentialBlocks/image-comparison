const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const CONTENT_POSITION = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

export const IMAGE_WIDTH = "imgWidth";
