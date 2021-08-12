/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls, PanelColorSettings } = wp.blockEditor;
const {
	PanelBody,
	BaseControl,
	ToggleControl,
	RangeControl,
	TextControl,
	TabPanel,
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

const Inspector = ({ attributes, setAttributes }) => {
	const {
		resOption,
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
						<div className={"eb-tab-controls" + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody title={__("General Settings")} initialOpen={true}>
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
												onChange={(beforeLabel) =>
													setAttributes({ beforeLabel })
												}
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
											<ResetControl
												onReset={() => setAttributes({ imageWidth: undefined })}
											>
												<RangeControl
													label={__("Image Width")}
													value={imageWidth}
													onChange={(imageWidth) =>
														setAttributes({ imageWidth })
													}
													min={0}
													max={600}
												/>
											</ResetControl>
										)}

										<ResetControl
											onReset={() => setAttributes({ lineWidth: undefined })}
										>
											<RangeControl
												label={__("Line Width")}
												value={lineWidth}
												onChange={(lineWidth) => setAttributes({ lineWidth })}
												min={0}
												max={20}
											/>
										</ResetControl>
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
