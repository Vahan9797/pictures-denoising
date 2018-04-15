import { RESPONSE, IMG_FILES_DIR, MESSAGES } from './constants';
import { rename, existsSync, exists, mkdir, mkdirSync, createWriteStream } from 'fs';
import JSZip from 'jszip';
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

  static zip(paths = [], isAbsPaths = false, singleFile = false) {
    const zip = new JSZip();
    const composedPaths = isAbsPaths ? paths : paths.map(path => Storage.composeAbsolutePath(path));
    if(!composedPaths.every(composedPath => Storage.checkDirExists(composedPath))) {
      throw new Error("Path does not exist");
    }

    singleFile ? zip.file(composedPaths) : composedPaths.forEach(composedPath => zip.file(composedPath));

    const zipName = `denoised-${(new Date()).toLocaleDateString()}`;
    return new Promise((resolve, reject) => {
      zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(createWriteStream(`${IMG_FILES_DIR}/downloads/${zipName}.zip`))
        .on('finish', () => {
          console.log('Zip created.');
          resolve(zipName);
        })
        .on('error', err => {
          reject(err);
          throw new Error(err);
        });
    });
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
    return new Promise((resolve, reject) => {
      if(form.downloadDir && Storage.checkDirExists(form.downloadDir) && form.download.file) {
        resolve(`${form.downloadDir}/${form.download.file}`);
      } else {
        reject({ status: ERROR, msg: 'Download file does not exist' });
      }
    })
  }

	static multiDownload(files) {
		return Storage.zip(files);
	}
}

const { composeAbsolutePath, getFileExtension, checkDirExists, getFileFullName, makeDir, zip } = Storage;
export { composeAbsolutePath, getFileExtension, checkDirExists, getFileFullName, makeDir, zip };