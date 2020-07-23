const attributes = {
	id: {
		type: "string",
	},
	leftImageURL: {
		type: "string",
		source: "attribute",
		attribute: "src",
		selector: ".eb-image-comparison-left",
	},
	rightImageURL: {
		type: "string",
		source: "attribute",
		attribute: "src",
		selector: ".eb-image-comparison-right",
	},
	hover: {
		type: "boolean",
		default: false,
	},
	fullWidth: {
		type: "boolean",
		default: true,
	},
	imageWidth: {
		type: "number",
	},
	position: {
		type: "number",
	},
	overlay: {
		type: "boolaen",
		default: true,
	},
	beforeLabel: {
		type: "string",
		default: "Before",
	},
	afterLabel: {
		type: "string",
		default: "After",
	},
	swap: {
		type: "boolean",
		default: false,
	},
	lineWidth: {
		type: "number",
	},
	lineColor: {
		type: "string",
	},
	arrowColor: {
		type: "string",
	},
};

export default attributes;
