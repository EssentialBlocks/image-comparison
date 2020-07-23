const Save = ({ attributes }) => {
	const {
		id,
		leftImageURL,
		rightImageURL,
		hover,
		fullWidth,
		imageWidth,
		position,
		overlay,
		beforeLabel,
		afterLabel,
		lineColor,
		lineWidth = lineWidth || 3,
		arrowColor,
	} = attributes;

	const defaultLineColor = "#ffffff";
	const defaultArrowColor = "#ffffff";

	const wrapperStyles = {
		width: fullWidth ? undefined : imageWidth,
	};

	return (
		<div
			className="eb-image-comparison-wrapper"
			data-id={`eb-ic-${id}`}
			data-overlay={overlay ? "true" : "false"}
			data-hover={hover ? "true" : "false"}
			data-position={position}
			data-before-label={beforeLabel}
			data-after-label={afterLabel}
			data-line-width={lineWidth}
			data-line-color={lineColor || defaultLineColor}
			data-arrow-color={arrowColor || defaultArrowColor}
			style={wrapperStyles}
		>
			<img
				className="eb-image-comparison-image eb-image-comparison-left"
				alt="Left Image"
				src={leftImageURL}
			/>
			<img
				className="eb-image-comparison-image eb-image-comparison-right"
				alt="Right Image"
				src={rightImageURL}
			/>
		</div>
	);
};

export default Save;
