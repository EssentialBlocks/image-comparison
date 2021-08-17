import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./Save";
import icon from "./icon";
import attributes from "./attributes";

registerBlockType("image-comparison/image-comparison", {
	title: __("Image Comparison", "image-comparison"),
	description: __("", "image-comparison"),
	category: "widgets",
	keywords: [__("image compare"), __("comparison"), __("compare")],
	attributes,
	icon,
	edit: Edit,
	save,
});
