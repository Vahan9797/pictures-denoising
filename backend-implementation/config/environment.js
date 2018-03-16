const load = require('dotenv').load;
const fileExists = require('fs').existsSync;
const path = require('path');

// for every build reload and every file .env will be loaded, but only once;
module.exports = function env(key) {
	if(!env.LOAD_ENV_ONCE) {
		fileExists(path.join(__dirname, '../../override.env')) ? load(path.join(__dirname, '../../override.env')) : load();
		Object.defineProperty(env, 'LOAD_ENV_ONCE', { value: true });
		console.log('.env variables loaded');
	}

	return process.env[key];
}
