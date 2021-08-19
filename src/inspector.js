/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls } = wp.blockEditor;
const {
	PanelBody,
	BaseControl,
	ToggleControl,
	RangeControl,
	TextControl,
	TabPanel,
	ButtonGroup,
	Button,
} = wp.components;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * Internal dependencies
 */
import {
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "../util/helpers";
import objAttributes from "./attributes";
import ImageAvatar from "../util/image-avatar";
import ResetControl from "../util/reset-control";
import ColorControl from "../util/color-control";
import ResponsiveRangeController from "../util/responsive-range-control";
import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import TypographyDropdown from "../util/typography-control-v2";
import {
	CONTENT_POSITION,
	IMAGE_WIDTH,
	WRAPPER_PADDING,
	WRAPPER_MARGIN,
} from "./constants";
import { typoPrefix_label } from "./constants/typographyConstants";

const Inspector = ({ attributes, setAttributes, onImageSwap }) => {
	const {
		resOption,
		leftImageURL,
		rightImageURL,
		hover,
		verticalMode,
		showLabels,
		beforeLabel,
		afterLabel,
		fullWidth,
		position,
		swap,
		lineWidth,
		lineColor,
		contentPosition,
		noHandle,
		labelColor,
		labelBackgroundColor,
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	useEffect(() => {
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: "general",
							title: "General",
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: "Styles",
							className: "eb-tab styles",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls " + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody title={__("General Settings")} initialOpen={true}>
										<>
											{leftImageURL && (
												<BaseControl label={__("Left Image")}>
													<ImageAvatar
														imageUrl={leftImageURL}
														onDeleteImage={() =>
															setAttributes({ leftImageURL: null })
														}
													/>
												</BaseControl>
											)}

											{rightImageURL && (
												<BaseControl label={__("Right Image")}>
													<ImageAvatar
														imageUrl={rightImageURL}
														onDeleteImage={() =>
															setAttributes({ rightImageURL: null })
														}
													/>
												</BaseControl>
											)}
										</>
										<BaseControl
											label={__("Alignment", "flipbox")}
											id="eb-button-group-alignment"
										>
											<ButtonGroup id="eb-button-group-alignment">
												{CONTENT_POSITION.map((item) => (
													<Button
														isLarge
														isPrimary={contentPosition === item.value}
														isSecondary={contentPosition !== item.value}
														onClick={() =>
															setAttributes({
																contentPosition: item.value,
															})
														}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
										<ToggleControl
											label={__("Full Width", "image-comparison")}
											checked={fullWidth}
											onChange={() => setAttributes({ fullWidth: !fullWidth })}
										/>
										{!fullWidth && (
											<>
												<ResponsiveRangeController
													baseLabel={__("Image Width", "image-comparion")}
													controlName={IMAGE_WIDTH}
													resRequiredProps={resRequiredProps}
													min={0}
													max={1000}
													step={1}
													noUnits
												/>
											</>
										)}
										<ToggleControl
											label={__("Move on Hover", "image-comparison")}
											checked={hover}
											onChange={() => setAttributes({ hover: !hover })}
										/>
										<ToggleControl
											label={__("Vertical Mode", "image-comparison")}
											checked={verticalMode}
											onChange={() =>
												setAttributes({ verticalMode: !verticalMode })
											}
										/>
										<ToggleControl
											label={__("Show Labels", "image-comparison")}
											checked={showLabels}
											onChange={() =>
												setAttributes({ showLabels: !showLabels })
											}
										/>
										{showLabels && (
											<>
												<TextControl
													label={__("Before Label", "image-comparison")}
													value={beforeLabel}
													onChange={(beforeLabel) =>
														setAttributes({ beforeLabel })
													}
												/>
												<TextControl
													label={__("After Label", "image-comparison")}
													value={afterLabel}
													onChange={(afterLabel) =>
														setAttributes({ afterLabel })
													}
												/>
											</>
										)}
										<ToggleControl
											label={__("Swap Images")}
											checked={swap}
											onChange={() => onImageSwap()}
										/>
										<ToggleControl
											label={__("No Handle", "image-comparison")}
											checked={noHandle}
											onChange={() => setAttributes({ noHandle: !noHandle })}
										/>
										<ResetControl
											onReset={() =>
												setAttributes({
													position: objAttributes.position.default,
												})
											}
										>
											<RangeControl
												label={__("Slider Position", "image-comparison")}
												value={position}
												onChange={(position) => setAttributes({ position })}
												min={0}
												max={100}
												help={__(
													"Update & reload to see effect in backend",
													"image-comparison"
												)}
											/>
										</ResetControl>
										<ResetControl
											onReset={() =>
												setAttributes({
													lineWidth: objAttributes.lineWidth.default,
												})
											}
										>
											<RangeControl
												label={__("Slider Line Width", "image-comparison")}
												value={lineWidth}
												onChange={(lineWidth) => setAttributes({ lineWidth })}
												min={0}
												max={10}
											/>
										</ResetControl>
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_MARGIN}
											baseLabel={__("Margin", "image-comparison")}
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={WRAPPER_PADDING}
											baseLabel={__("Padding", "image-comparison")}
										/>
										<ColorControl
											label={__("Line Color", "image-comparison")}
											color={lineColor}
											onChange={(lineColor) => setAttributes({ lineColor })}
										/>
									</PanelBody>
									{showLabels && (
										<PanelBody title={__("Labels", "image-comparison")}>
											<TypographyDropdown
												baseLabel={__("Typography", "image-comparison")}
												typographyPrefixConstant={typoPrefix_label}
												resRequiredProps={resRequiredProps}
											/>
											<ColorControl
												label={__("Color", "image-comparison")}
												color={labelColor}
												onChange={(labelColor) => setAttributes({ labelColor })}
											/>
											<ColorControl
												label={__("Background Color", "image-comparison")}
												color={labelBackgroundColor}
												onChange={(labelBackgroundColor) =>
													setAttributes({ labelBackgroundColor })
												}
											/>
										</PanelBody>
									)}
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
};

export default Inspector;
