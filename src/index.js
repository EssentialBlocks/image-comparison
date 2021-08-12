import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./Save";
import icon from "./icon";
import attributes from "./attributes";

registerBlockType("block/image-comparison", {
	title: __("Image Comparison", "block"),
	description: __("", "block"),
	category: "widgets",
	keywords: [__("image compare"), __("comparison"), __("compare")],
	attributes,
	icon,
	edit: Edit,
	save,
});
