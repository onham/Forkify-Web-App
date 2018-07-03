const path = require('path'); //including the 'path' package
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', '../src/js/index.js'], //where to start bundling
	output: {
		path: path.resolve(__dirname, 'dist'), //method to join the current path with the one we want our bundle to be in
		filename: 'js/bundle.js' //what we callin the bundle file
	},
	devServer: {
		contentBase: '../dist' //dist folder is all the final code we will be shipping to the client
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],
	module: {
		rules: [  //rules receives an array of all the loaders we want to use
			{
				test: /\.js$/,  //this is a regular expression to test for all the javascript files
				exclude: /node_modules/,   //excluding all the js files in node modules
				use: {    //for all the js files to use the babel loader
					loader: 'babel-loader'
				}
			}
		]
	}
};

// to notes in package.json::::
// build script bundles
// command line interface allows us to run scripts in cmd
// dev server allows any changes made in files to update realtime in the browser