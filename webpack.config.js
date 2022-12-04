const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const mode = process.env.NODE_ENV;

module.exports = {
	entry: path.resolve(__dirname, 'src') + '/index.js',
	output: {
		path: path.resolve(__dirname, "./dist"),
		filename: 'bundle.js',
	},
	mode,
	plugins: [
		new MiniCssExtractPlugin({
			filename: './style/main.css',
		}),
		new htmlWebpackPlugin({
			template: './src/index.html',
		})
	],
	resolve: {
		extensions: ['.ts', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									[
										"postcss-preset-env",
										{
											// Options
										},
									]
								]
							}
						}
					},
					"sass-loader",
				],
				exclude: /node_modules/,
			},
		],
	},
}
