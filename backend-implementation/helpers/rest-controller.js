import { RESPONSE, MESSAGES, IMG_FILES_DIR, FILE_UPLOAD_SUCCESS } from "./constants";
import Storage from './Storage';
import formidable from 'formidable';

const { SUCCESS, NOT_FOUND, ERROR } = RESPONSE;

export default function restController(router) {
    router.post('/upload', (req, res) => {
        Storage.upload(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_UPLOAD_SUCCESS }))
          .catch(({ status, msg }) => res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] }));
    });

    router.post('multi-upload', (req, res) => {
        Storage.multiUpload(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_UPLOAD_SUCCESS }))
          .catch(({ status, msg }) => res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] }));
    });

    router.post('/denoising', (req, res) => {

    });

    router.post('/multi-denoising', (req, res) => {

    });

    router.post('/download', (req, res) => {
        Storage.download(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_DOWNLOAD_SUCCESS }))
          .catch(({ status, msg }) => res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] }));
    });

    router.post('/multi-download', (req, res) => {
        Storage.multiDownload(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_DOWNLOAD_SUCCESS }))
          .catch(({ status, msg }) => res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] }));
    });

    return router;
}

const formBuilder = (req, options = { uploadDir: IMG_FILES_DIR, keepExtensions: true }) => {
  const form = formidable.IncomingForm();
  form.req = req;
  form.uploadDir = options.uploadDir;
  form.keepExtensions = options.keepExtensions;

  return form;
}