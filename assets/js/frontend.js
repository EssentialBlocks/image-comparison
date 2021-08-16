function stringToBoolean(string) {
	switch (string.toLowerCase().trim()) {
		case "true":
		case "yes":
		case "1":
			return true;
		case "false":
		case "no":
		case "0":
		case null:
			return false;
		default:
			return Boolean(string);
	}
}

const viewers = document.querySelectorAll(".eb-image-comparison-wrapper");

viewers.forEach((element) => {
	const imageElement = element.querySelector(".eb-image-compare");
	const options = {
		// UI Theme Defaults

		controlColor: "#FFFFFF",
		controlShadow: true,
		addCircle: stringToBoolean(element.getAttribute("data-circle-control")),
		addCircleBlur: stringToBoolean(element.getAttribute("data-circle-blur")),

		// Label Defaults

		showLabels: false,
		labelOptions: {
			before: "Before",
			after: "After",
			onHover: false,
		},

		// Smoothing

		smoothing: true,
		smoothingAmount: 500,

		// Other options

		hoverStart: stringToBoolean(element.getAttribute("data-hover-start")),
		verticalMode: false,
		startingPoint: 50,
		fluidMode: false,
	};
	console.log(options);
	let view = new ImageCompare(imageElement, options).mount();
	console.log(view);
});
