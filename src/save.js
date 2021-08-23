const { useBlockProps } = wp.blockEditor;

const Save = ({ attributes }) => {
	const {
		blockId,
		leftImageURL,
		rightImageURL,
		hover,
		verticalMode,
		showLabels,
		beforeLabel,
		afterLabel,
		position,
		lineWidth,
		lineColor,
		contentPosition,
		horizontalLabelPosition,
		verticalLabelPosition,
		noHandle,
	} = attributes;

	const alignmentClass =
		contentPosition === "center"
			? " eb-image-comparison-align-center"
			: contentPosition === "right"
			? " eb-image-comparison-align-right"
			: "";
	let labelPostionClass = verticalMode
		? ` eb-label-vertical-${verticalLabelPosition}`
		: ` eb-label-horizontal-${horizontalLabelPosition}`;

	return (
		<>
			<div {...useBlockProps.save()}>
				<div
					className={`eb-image-comparison-wrapper ${blockId}${alignmentClass}${labelPostionClass}`}
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
