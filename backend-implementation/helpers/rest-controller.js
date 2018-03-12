import { RESPONSE, MAX_FILE_SIZE, MESSAGES, IMG_FILES_DIR, FILE_UPLOAD_SUCCESS } from "./constants";
import Storage from './Storage';
const { SUCCESS, FORBIDDEN, NOT_FOUND, ERROR } = RESPONSE;

export default function restController(router) {
    router.post('/upload', (req, res, next) => {
        Storage.upload(req.file).then(({ status, msg }) => res.status(status).send({ msg }))
    });

    router.post('multi-upload', (req, res, next) => {

    });

    router.post('/denoising', (req, res) => {

    });

    router.post('/multi-denoising', (req, res) => {

    });

    router.post('/download', (req, res, next) => {

    });

    router.post('/multi-download', (req, res, next) => {

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
