import { render } from "@wordpress/element";
import ReactCompareImage from "react-compare-image";

// Accept only plain colour values for the slider line.
const SAFE_COLOR =
	/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([\d\s.,%\/]+\)|var\(--[\w-]+\)|[a-z]+)$/i;

window.addEventListener("DOMContentLoaded", (event) => {
	const wrappers = document.getElementsByClassName(
		`eb-image-comparison-wrapper`
	);

	for (let wrapper of wrappers) {
		let leftImage = wrapper.getAttribute("data-left-image");
		let rightImage = wrapper.getAttribute("data-right-image");
		let verticalMode = wrapper.getAttribute("data-vertical-mode");
		let hover = wrapper.getAttribute("data-hover");
		let showLabels = wrapper.getAttribute("data-show-label");
		let beforeLabel = wrapper.getAttribute("data-left-label");
		let afterLabel = wrapper.getAttribute("data-right-label");
		let sliderPosition = wrapper.getAttribute("data-slider-position");
		let sliderLineWidth = wrapper.getAttribute("data-line-width");
		let sliderLineColor = wrapper.getAttribute("data-line-color");
		if (sliderLineColor && !SAFE_COLOR.test(sliderLineColor.trim())) {
			sliderLineColor = null;
		}
		let noHandle = wrapper.getAttribute("data-handle");
		render(
			<ReactCompareImage
				leftImage={leftImage}
				rightImage={rightImage}
				{...(verticalMode == "true" ? { vertical: "vertical" } : {})}
				{...(hover == "true" ? { hover: "hover" } : {})}
				{...(showLabels == "true" ? { leftImageLabel: beforeLabel } : {})}
				{...(showLabels == "true" ? { rightImageLabel: afterLabel } : {})}
				{...(noHandle == "true" ? { handle: <React.Fragment /> } : {})}
				sliderPositionPercentage={sliderPosition ? sliderPosition / 100 : 0.5}
				sliderLineWidth={sliderLineWidth ? sliderLineWidth : 0}
				sliderLineColor={sliderLineColor ? sliderLineColor : "#ffffff"}
			/>,
			wrapper
		);
	}
});
