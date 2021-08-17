const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(__dirname, "src/index.js"),
		frontend: path.resolve(__dirname, "assets/js/frontend.js"),
	},
	output: {
		...defaultConfig.output,
		filename: "[name].js",
		path: path.resolve(__dirname, "build"),
	},
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
};
