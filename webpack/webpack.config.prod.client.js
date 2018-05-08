const path = require("path");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const output={
	// path: the output directory as an absolute path (required)
	path: path.resolve(__dirname, "../functions/reactssr/client"),
	// filename: specifies the name of output file on disk (required)
	filename: "[name].js",
	// publicPath: specifies the server-relative URL of the output resource directory
	// https://webpack.js.org/configuration/output/#output-publicpath
	publicPath: "/static/"
};

module.exports = function(env) {

	if (env.ENV === "deploy") {

	}
	return {

		mode: 'production',
		name: "client",
		target: "web",
		// Start entry point(s)
		entry: {
			app: [
				"./src/static/ts/polyfill.ts",
				"./src/static/ts/common",
				"./src/components/client"
			]
		},

		// Affecting the output of the compilation
		output: output,

		// Determine how the different types of modules within a project will be treated
		module: {
			rules: [
				// Use a list of loaders to load css files
				{test: /\.tsx?$/, use: ["ts-loader"]},
				{
					test: /\.(css|less)$/,
					use: [
						{loader: 'style-loader'},
						{loader: 'css-loader', options: {importLoaders: 1, sourceMap: false, url: false}},
						{
							loader: "postcss-loader",
							options: {plugins: [autoprefixer, cssnano({zindex: false, reduceIdents: false})]}
						},
						{loader: "less-loader"}
					]
				}
			]
		},
		resolve: {
			modules: ["node_modules", path.resolve(__dirname, "component")],
			extensions: [".tsx", ".ts", ".js"]
		},
		// A list of used webpack plugins
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			// Better webpack module name display
			new webpack.NamedModulesPlugin(),
			// 공통으로 쓰이는 의존 모듈들을 별개의 js파일로 분리해서 번들링 함
			new webpack.ProvidePlugin({
				fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
			}),
			new UglifyJsPlugin({
				sourceMap: false,
				uglifyOptions: {
					ecma: 8,
					compress: {
						warnings: false
					}
				}
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			})
		]
	}
}
