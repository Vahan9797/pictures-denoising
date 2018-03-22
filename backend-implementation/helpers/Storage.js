import { RESPONSE, MAX_FILE_SIZE, IMG_FILES_DIR, MESSAGES } from "./constants";
import fs from 'fs';

const { FORBIDDEN, ERROR } = RESPONSE;

export default class Storage {
	static upload(form) {
    return new Promise((resolve, reject) => {
      form.parse(form.req, (err, fields, files) => {
        const { size, msg } = MAX_FILE_SIZE;

        if(err) {
          err.status = err.status || ERROR;
          reject(err);
        }
        if(!files.upload || files.upload.size > size) {
          const err = new Error(msg);
          err.status = FORBIDDEN;
          reject(err);
        }

        fs.rename(files.upload.path, `${IMG_FILES_DIR}/${req.body.files[0].name}`, err => {
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

	static multiUpload(form) {
		// TODO
	}

	static download(file) {
		// TODO
	}

	static multiDownload(files) {
		// TODO
	}
}