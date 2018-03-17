import webpack from 'webpack';
import path from 'path';

const BUILD_DIR = path.join(__dirname, 'public');
const APP_DIR = path.join(__dirname, 'public/js');

const config = {
	entry: path.join(APP_DIR, 'app-client.js'),
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				include: [APP_DIR, /src/],
				exclude: [/node_modules/],
				loader: 'babel-loader',
				options: {
					cacheDirectory: true
				}
			}
		]
	}
}

export default config;