import { load } from 'dotenv';
import {existsSync as fileExists} from 'fs';
import path from 'path';

// for every build reload and every file .env will be loaded, but only once;
export default function env(/* arguments */) {
	const args = arguments;
	if(!env.LOAD_ENV_ONCE) {
		fileExists(path.join(__dirname, '../../override.env')) ? load(path.join(__dirname, '../../override.env')) : load();
		Object.defineProperty(env, 'LOAD_ENV_ONCE', { value: true });
		console.log('.env variables loaded');
	}

    switch(args.length) {
		case 1:
			if(Array.isArray(args[0])) return [...args[0]].map(arg => process.env[arg]);
            return process.env[args[0]];
		case 2:
			return process.env[args[0]] !== args[1];
		default:
			return process.env;
	}
}
