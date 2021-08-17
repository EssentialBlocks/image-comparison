const { render } = wp.element;
import ReactCompareImage from "react-compare-image";

window.addEventListener("DOMContentLoaded", (event) => {
	const wrappers = document.getElementsByClassName(
		`eb-image-comparison-wrapper`
	);

	for (let wrapper of wrappers) {
		let leftImage = wrapper.getAttribute("data-left-image");
		let rightImage = wrapper.getAttribute("data-right-image");
		let verticalMode = wrapper.getAttribute("data-vertical-mode");
		let hover = wrapper.getAttribute("data-hover");
		console.log(typeof verticalMode, typeof hover);
		render(
			<ReactCompareImage
				leftImage={leftImage}
				rightImage={rightImage}
				{...(verticalMode == "true" ? { vertical: "vertical" } : {})}
				{...(hover == "true" ? { hover: "hover" } : {})}
			/>,
			wrapper
		);
	}
});
