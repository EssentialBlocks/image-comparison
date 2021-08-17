const { useBlockProps, MediaUpload } = wp.blockEditor;
const { select } = wp.data;
const { Button } = wp.components;
const { __ } = wp.i18n;
const { useState, useRef, useEffect } = wp.element;
/**
 * Internal Import
 */
import "./editor.scss";
import ReactCompareImage from "react-compare-image";
import Inspector from "./inspector";
import {
	softMinifyCssStrings,
	isCssExists,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} from "../util/helpers";

const edit = (props) => {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		leftImageURL,
		rightImageURL,
		hover,
		verticalMode,
		circleControl,
		circleBlur,
		showLabels,
		beforeLabel,
		afterLabel,
		fullWidth,
		imageWidth,
		overlay,
		position,
		swap,
		lineWidth,
		lineColor,
		arrowColor,
	} = attributes;

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-image-comparison";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	useEffect(() => {
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: `eb-guten-block-main-parent-wrapper`,
	});

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(``);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(``);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(``);
	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	const hasBothImages = leftImageURL && rightImageURL;

	return [
		isSelected && (
			<Inspector
				key="inspector"
				attributes={attributes}
				setAttributes={setAttributes}
			/>
		),
		<div className={`eb-image-comparison-wrapper ${blockId}`}>
			{hasBothImages ? (
				<ReactCompareImage
					leftImage={leftImageURL}
					rightImage={rightImageURL}
					{...(verticalMode ? { vertical: "vertical" } : {})}
					{...(hover ? { hover: "hover" } : {})}
					{...(showLabels ? { leftImageLabel: beforeLabel } : {})}
					{...(showLabels ? { rightImageLabel: afterLabel } : {})}
					sliderPositionPercentage={position / 100}
				/>
			) : (
				<div className="eb-image-comparison-placeholder">
					<MediaUpload
						onSelect={(media) => setAttributes({ leftImageURL: media.url })}
						type="image"
						value={leftImageURL}
						render={({ open }) =>
							!leftImageURL ? (
								<Button
									className="eb-image-comparison-upload components-button"
									label={__("Upload Left Image")}
									icon="format-image"
									onClick={open}
								/>
							) : (
								<img className="eb-image-comparison-image" src={leftImageURL} />
							)
						}
					/>
					<MediaUpload
						onSelect={(media) => setAttributes({ rightImageURL: media.url })}
						type="image"
						value={rightImageURL}
						render={({ open }) =>
							!rightImageURL ? (
								<Button
									className="eb-image-comparison-upload components-button"
									label={__("Upload Right Image")}
									icon="format-image"
									onClick={open}
								/>
							) : (
								<img
									className="eb-image-comparison-image"
									src={rightImageURL}
								/>
							)
						}
					/>
				</div>
			)}
		</div>,
	];
};
export default edit;
