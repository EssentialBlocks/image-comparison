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
			<div
				className={`eb-image-comparison-wrapper ${blockId}`}
				data-hover-start={hover}
				data-vertical-mode={verticalMode}
				data-circle-control={circleControl}
				data-circle-blur={circleBlur}
			>
				<div className="eb-image-compare">
					<img className="eb-image-comparison-left" src={leftImageURL} alt="" />
					<img
						className="eb-image-comparison-right"
						src={rightImageURL}
						alt=""
					/>
				</div>
			</div>
		</>
	);
};
export default Save;
