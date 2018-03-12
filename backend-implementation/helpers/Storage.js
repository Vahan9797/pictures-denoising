import formidable from 'formidable';
import fs from 'fs-extra';

export default class Storage {
	static upload(file) {
    const form = formidable.IncomingForm();
    form.uploadDir = IMG_FILES_DIR;
    form.keepExtensions = true;

    form.parse(req, (err, fields, { fileUploaded }) => {
        const { size, msg } = MAX_FILE_SIZE;
        if(err) {
            next(err);
        }
        if(fileUploaded.size > size) {
            const err = new Error(msg);
            err.status = FORBIDDEN;
            next(err);
        }

        fs.rename(fileUploaded.path, `${IMG_FILES_DIR}/${req.body.file.name}`, err => {
            if(err) {
                next(err);
            }
            console.log('File uploaded and renamed');
        });

        status(SUCCESS).send(FILE_UPLOAD_SUCCESS);
    })
	}

	static multiUpload(files) {
		// TODO
	}

	static download(file) {
		// TODO
	}

	static multiDownload(files) {
		// TODO
	}
}