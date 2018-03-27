import env from '../../config/environment';
import { join } from 'path';
import { writeFileSync, existsSync } from 'fs';
import { Op } from 'sequelize';

const defaultConfig = require('./config.json')[env('NODE_ENV')];
const configOverride = {};
const overrideFile = join(__dirname, env('DB_CONFIG_FILE') || 'config-override.json');

configOverride[env('NODE_ENV')] = {
	"username": env('DB_USERNAME') || defaultConfig["username"],
	"password": env('DB_PASSWORD') || defaultConfig["password"],
	"database": env('DB_NAME') || defaultConfig["database"],
	"host": env('HOST') || defaultConfig["host"],
	"port": env('DB_PORT') || defaultConfig["port"],
	"dialect": env('DB_DIALECT') || defaultConfig["dialect"],
	"operatorsAliases": Op || defaultConfig["operatorsAliases"]
}

if(!existsSync(overrideFile)) {
	writeFileSync(overrideFile, JSON.stringify(configOverride), 'utf-8');
}

export default configOverride;