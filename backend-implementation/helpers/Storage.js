import { RESPONSE, MAX_FILE_SIZE, IMG_FILES_DIR, MESSAGES } from "./constants";
import fs from 'fs-extra';

const { FORBIDDEN, ERROR } = RESPONSE;

export default class Storage {
	static upload(form) {
        const req = typeof form.req === 'object' && form.req;
        delete form.req;

        return new Promise((resolve, reject) => {
            form.parse(req, (err, fields, { fileUploaded }) => {
                const { size, msg } = MAX_FILE_SIZE;

                if(err) {
                    err.status = err.status || ERROR;
                  reject(err);
                }
                if(fileUploaded.size > size) {
                  const err = new Error(msg);
                  err.status = FORBIDDEN;
                  reject(err);
                }

                fs.rename(fileUploaded.path, `${IMG_FILES_DIR}/${req.body.file.name}`, err => {
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