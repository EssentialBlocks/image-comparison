const { useBlockProps } = wp.blockEditor;

const Save = ({ attributes }) => {
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
		fullWidth,
		imageWidth,
		overlay,
		showLabels,
		beforeLabel,
		afterLabel,
		position,
		swap,
		lineWidth,
		lineColor,
		contentPosition,
		noHandle,
	} = attributes;
	const alignmentClass =
		contentPosition === "center"
			? " eb-image-comparison-align-center"
			: contentPosition === "right"
			? " eb-image-comparison-align-right"
			: "";
	return (
		<>
			<div {...useBlockProps.save()}>
				<div
					className={`eb-image-comparison-wrapper ${blockId}${alignmentClass}`}
					data-left-image={leftImageURL}
					data-right-image={rightImageURL}
					data-vertical-mode={verticalMode}
					data-hover={hover}
					data-show-label={showLabels}
					data-left-label={beforeLabel}
					data-right-label={afterLabel}
					data-slider-position={position}
					data-line-width={lineWidth}
					data-line-color={lineColor}
					data-handle={noHandle}
				></div>
			</div>
		</>
	);
};
export default Save;
