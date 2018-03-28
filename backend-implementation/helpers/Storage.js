import { RESPONSE, IMG_FILES_DIR, MESSAGES } from './constants';
import { rename, existsSync, exists, mkdir, mkdirSync } from 'fs';
import { join } from 'path';

const { FORBIDDEN, ERROR } = RESPONSE;

export default class Storage {
  static checkDirExists(path, asyncMode = false) {
    return asyncMode ? exists(path) : existsSync(path);
  }

  static makeDir(path, asyncMode = false) {
    if(Storage.checkDirExists(path, asyncMode)) {
      return;
    }
    return asyncMode ? mkdir(path) : mkdirSync(path);
  }

  static getFileExtension(file) {
    return /\w{3,4}$/.exec(Storage.getFileFullName(file))[0] || undefined;
  }

  static getFileFullName(file) {
    return /[^/\\&\?]+\.\w{3,4}(?=([\?&].*$|$))/.exec(file)[0] || undefined;
  }

  static composeAbsolutePath(relPath) {
    return join(__dirname, relPath);
  }

	static upload(form) {
    Storage.makeDir(`${IMG_FILES_DIR}/uploads`);
    return new Promise((resolve, reject) => {
      form.parse(form.req, (err, fields, files) => {
        if(err) {
          err.status = err.status || ERROR;
          reject(err);
        }

        rename(files.upload.path, `${form.uploadDir}/${files.upload.name}`, err => {
          if(err) {
            err.status = err.status || ERROR;
            reject(err);
          }
          console.log('File uploaded and renamed');
          resolve();
        });
      })
    })
	}

	static multiUpload(forms) {
		return Promise.all(forms.map(form => Storage.upload(form)));
	}

	static download(form) {
		if(form.downloadDir && existsSync(form.downloadDir)) {
      // TODO
    }
	}

	static multiDownload(files) {
		// TODO
	}
}