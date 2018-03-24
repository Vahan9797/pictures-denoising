import { RESPONSE, IMG_FILES_DIR, MESSAGES } from "./constants";
import fs from 'fs';

const { FORBIDDEN, ERROR } = RESPONSE;

export default class Storage {
	static upload(form) {
    return new Promise((resolve, reject) => {
      form.parse(form.req, (err, fields, files) => {
        if(err) {
          err.status = err.status || ERROR;
          reject(err);
        }

        fs.rename(files.upload.path, `${IMG_FILES_DIR}/${files.upload.name}`, err => {
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

	static download(file) {
		// TODO
	}

	static multiDownload(files) {
		// TODO
	}
}