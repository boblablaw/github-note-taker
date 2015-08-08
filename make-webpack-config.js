var path = require("path");
var webpack = require("webpack");
var loadersByExtension = require("./loadersByExtension");

module.exports = function(options) {
	var loaders = {
		"jsx": options.hotComponents ? ["react-hot-loader", "babel-loader?stage=0"] : "babel-loader?stage=0",
		"js": {
			loader: "babel-loader?stage=0",
			include: path.join(__dirname, "app")
		},
		"json": "json-loader",
		"coffee": "coffee-redux-loader",
		"json5": "json5-loader",
		"txt": "raw-loader",
		"png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
		"woff|woff2": "url-loader?limit=100000",
		"ttf|eot": "file-loader",
		"wav|mp3": "file-loader",
		"html": "html-loader",
		"md|markdown": ["html-loader", "markdown-loader"],
		"sass": "sass-loader",
		"less": "less-loader"
	};
	var modulesDirectories = ["node_modules"];
	var extensions = ["", ".js", ".jsx"];
	var root = path.join(__dirname, "app");
	var plugins = [
		new webpack.optimize.UglifyJsPlugin({ compressor: { warnings: false } }),
		new webpack.optimize.DedupePlugin()
	];

	return {
		entry: "./app/application.js",
		output: { filename: "public/bundle.js" },
		module: { loaders: loadersByExtension(loaders) },
		devtool: options.devtool,
		debug: options.debug,
		resolveLoader: {
			root: path.join(__dirname, "node_modules")
		},
		resolve: {
			root: root,
			modulesDirectories: modulesDirectories,
			extensions: extensions
		},
		plugins: plugins
	};
};
