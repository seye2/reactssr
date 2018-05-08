const path = require("path");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// const nodeExternals = require("webpack-node-externals");

var selEntry={
	server_test:[
		"./src/server_test"
	]
};
const output={
	path: path.join(__dirname, "../functions/reactssr/server"),
	filename: "index.js",
	publicPath: "/",
	library: "index",
	libraryTarget: "commonjs"
};

module.exports = function(env) {

	if(env.ENV==="deploy") {
		selEntry={
			server:[
				"./src/server"
			]
		};

	}
	return {
		mode:'production',
		name:"server",
		target:"node",
		entry: selEntry,
		output: output,
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use:["ts-loader","./importCss"]
				},
				{
					test: /\.(css|less)$/,
					use: ExtractTextPlugin.extract({
						"use": [
							{loader: 'css-loader', options: {importLoaders: 1, sourceMap: false, url: false}},
							{
								loader: "postcss-loader",
								options: {plugins: [autoprefixer, cssnano({zindex: false, reduceIdents: false})]}
							},
							{loader:"less-loader"}
						],
						"fallback": "style-loader"
					})
				}
			]
		},
		resolve: {
			modules: ["node_modules", path.resolve(__dirname, "server")],
			extensions: [".tsx", ".ts", ".js"]
		},
		plugins:[
			new webpack.NoEmitOnErrorsPlugin(),
			// Better webpack module name display
			new webpack.NamedModulesPlugin(),
			new ExtractTextPlugin({
				filename:"../client/index.css"
			}),
			// 공통으로 쓰이는 의존 모듈들을 별개의 js파일로 분리해서 번들링 함
			new webpack.ProvidePlugin({
				fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			})
		]
	}

}





