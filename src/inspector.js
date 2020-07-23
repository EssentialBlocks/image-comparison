/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { InspectorControls, PanelColorSettings } from "@wordpress/block-editor";
import {
	PanelBody,
	BaseControl,
	ToggleControl,
	RangeControl,
	TextControl,
} from "@wordpress/components";

/**
 * Internal dependencies
 */
import ImageAvatar from "../util/image-avatar/ImageAvater";

const Inspector = ({ attributes, setAttributes, onImageSwap }) => {
	const {
		leftImageURL,
		rightImageURL,
		hover,
		fullWidth,
		imageWidth,
		overlay,
		beforeLabel,
		afterLabel,
		position,
		swap,
		lineWidth,
		lineColor,
		arrowColor,
	} = attributes;

	return (
		<InspectorControls key="controls">
			<PanelBody title={__("General Settings")} initialOpen={true}>
				{leftImageURL && (
					<BaseControl label={__("Left Image")}>
						<ImageAvatar
							imageUrl={leftImageURL}
							onDeleteImage={() => setAttributes({ leftImageURL: null })}
						/>
					</BaseControl>
				)}

				{rightImageURL && (
					<BaseControl label={__("Right Image")}>
						<ImageAvatar
							imageUrl={rightImageURL}
							onDeleteImage={() => setAttributes({ rightImageURL: null })}
						/>
					</BaseControl>
				)}

				<ToggleControl
					label={__("Move on Hover")}
					checked={hover}
					onChange={() => setAttributes({ hover: !hover })}
					help={__("Update & reload to see effect in backend")}
				/>

				<ToggleControl
					label={__("Overlay Label")}
					checked={overlay}
					onChange={() => setAttributes({ overlay: !overlay })}
					help={__("Only visible in frontend")}
				/>

				{overlay && (
					<TextControl
						label={__("Before Label")}
						value={beforeLabel}
						onChange={(beforeLabel) => setAttributes({ beforeLabel })}
					/>
				)}

				{overlay && (
					<TextControl
						label={__("After Label")}
						value={afterLabel}
						onChange={(afterLabel) => setAttributes({ afterLabel })}
					/>
				)}

				<ToggleControl
					label={__("Full Width")}
					checked={fullWidth}
					onChange={() => setAttributes({ fullWidth: !fullWidth })}
				/>

				<ToggleControl
					label={__("Swap Images")}
					checked={swap}
					onChange={() => onImageSwap()}
				/>

				{!fullWidth && (
					<RangeControl
						label={__("Image Width")}
						value={imageWidth}
						onChange={(imageWidth) => setAttributes({ imageWidth })}
						allowReset
						min={0}
						max={600}
					/>
				)}
				<RangeControl
					label={__("Line Width")}
					value={lineWidth}
					onChange={(lineWidth) => setAttributes({ lineWidth })}
					allowReset
					min={0}
					max={20}
				/>
			</PanelBody>

			<PanelColorSettings
				title={__("Colors")}
				initialOpen={false}
				colorSettings={[
					{
						value: lineColor,
						onChange: (lineColor) => setAttributes({ lineColor }),
						label: __("Line Color"),
					},
					{
						value: arrowColor,
						onChange: (arrowColor) => setAttributes({ arrowColor }),
						label: __("Arrow Color"),
					},
				]}
			/>
		</InspectorControls>
	);
};

export default Inspector;
