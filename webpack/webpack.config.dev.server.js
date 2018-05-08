const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcssCssnext = require("postcss-cssnext");
const postcssImport = require('postcss-import');
const NodemonPlugin = require( 'nodemon-webpack-plugin' );

console.log("WEBPACK Server");
module.exports = {
	mode:'development',
	name:"server",
	target:"node",
	entry: [
		"./src/local_server"
	],
	output: {
		"path": path.join(__dirname, "../dev/server"),
		"filename": "local_server.js",
		publicPath: "/"
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, use:["ts-loader","./importCss"] },
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
		modules: ["node_modules", path.resolve(__dirname, "src")],
			extensions: [".tsx", ".ts", ".js"]
	},
	plugins:[
		// 공통으로 쓰이는 의존 모듈들을 별개의 js파일로 분리해서 번들링 함
		new webpack.ProvidePlugin({
			fetch: "imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch"
		}),
		new webpack.NoEmitOnErrorsPlugin(),
		// Better webpack module name display
		new webpack.NamedModulesPlugin(),
		new ExtractTextPlugin({
			filename:"../client/index.css",
			allChunks:true
		})
		// ,
		// new NodemonPlugin({
		// 	watch: path.resolve('./dev/server'),
		// 	script: './dev/server/local_server.js'
		// })
	],
	externals: [nodeExternals()]
}





