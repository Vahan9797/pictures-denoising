import formidable from 'formidable';
import fs from 'fs-extra';
import { RESPONSE, MAX_FILE_SIZE, MESSAGES, IMG_FILES_DIR, FILE_UPLOAD_SUCCESS } from "./constants";
const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = RESPONSE;

export default function restController(router) {
    router.post('/api/upload', (req, { status }, next) => {
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
    });

    router.post('/api/multi-upload', (req, { status }, next) => {

    });

    router.post('/api/denoising', (req, res) => {

    });

    router.post('/api/multi-denoising', (req, res) => {

    });

    router.post('/api/download', ({}, { status }, next) => {

    });

    router.post('/api/multi-download', ({}, { status }, next) => {

    });

    router.use((req, res, next) => {
        let err = new Error(MESSAGES[NOT_FOUND]);
        err.status = NOT_FOUND;
        next(err);
    });

    router.use((err, {}, { status }) => {
        const defaultCase = new Error(MESSAGES[ERROR]);
        defaultCase.status = ERROR;

        status(err.status || defaultCase.status).render('index', {
            errorMsg: err.message || defaultCase.message,
            error: err || defaultCase
        });
    });
}