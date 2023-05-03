const path = require("path")
const pkg = require("./package.json")

module.exports = {
	entry: "./src/index.ts",
	output: {
		filename: pkg.main,
		path: path.resolve(__dirname, "./"),
		// module: true,
	},
	experiments: {
		// outputModule: true,
	},
	plugins: [

	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ["babel-loader"],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: ["ts-loader"],
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
	},
}
