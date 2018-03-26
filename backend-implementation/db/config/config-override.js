import env from '../../config/environment';
import { join } from 'path';

const defaultConfig = require('./config.json')[env('NODE_ENV')];
const configOverride = {};

configOverride[env('NODE_ENV')] = {
	"username": env('DB_USERNAME') || defaultConfig["username"],
	"password": env('DB_PASSWORD') || defaultConfig["password"],
	"database": env('DB_NAME') || defaultConfig["database"],
	"host": env('HOST') || defaultConfig["host"],
	"dialect": env('DB_DIALECT') || defaultConfig["dialect"]
}

export default configOverride;