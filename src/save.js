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
		beforeLabel,
		afterLabel,
		position,
		swap,
		lineWidth,
		lineColor,
		arrowColor,
	} = attributes;
	return (
		<>
			<div {...useBlockProps.save()}>
				<div
					className={`eb-image-comparison-wrapper ${blockId}`}
					data-left-image={leftImageURL}
					data-right-image={rightImageURL}
					data-vertical-mode={verticalMode}
					data-hover={hover}
				></div>
			</div>
		</>
	);
};
export default Save;
