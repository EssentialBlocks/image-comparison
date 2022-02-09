import { __ } from "@wordpress/i18n";

import { ImageComparisonIcon } from "./icon";
import Edit from "./edit";
import save from "./save";
import example from "./example";
import attributes from "./attributes";
import metadata from "../block.json";
const { ebConditionalRegisterBlockType } = EBImageComparisonControls;

ebConditionalRegisterBlockType(metadata, {
	keywords: [
		__("image compare", "image-comparison"),
		__("comparison", "image-comparison"),
		__("compare", "image-comparison"),
	],
	attributes,
	icon: ImageComparisonIcon,
	edit: Edit,
	save,
	example,
});
