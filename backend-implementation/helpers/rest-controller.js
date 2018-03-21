import { RESPONSE, MESSAGES, IMG_FILES_DIR, FILE_UPLOAD_SUCCESS } from "./constants";
import Storage from './Storage';
import { IncomingForm } from 'formidable';

const { SUCCESS, NOT_FOUND, ERROR } = RESPONSE;

export default function restController(router) {
    router.post('/upload', (req, res) => {
        Storage.upload(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_UPLOAD_SUCCESS }))
          .catch(({ status, msg }) => res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] }));
    });

    router.post('/multi-upload', (req, res) => {
        Storage.multiUpload(formBuilder(req))
          .then(() => res.status(SUCCESS).send({ msg: FILE_UPLOAD_SUCCESS }))
          .catch(({ status, msg }) => {console.log(status, msg);res.status(status || ERROR).send({ msg: msg || MESSAGES[ERROR] })});
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

    router.use((req, res, next) => {
      let err = new Error(MESSAGES[NOT_FOUND]);
      err.status = NOT_FOUND;
      next(err);
    });

    router.use((err, req, res, next) => {
      const defaultCase = new Error(MESSAGES[ERROR]);
      defaultCase.status = ERROR;

      res.status(err.status || defaultCase.status).render('index', {
          errorMsg: err.message || defaultCase.message,
          error: err || defaultCase
      });
    });

    return router;
}

const formBuilder = (req, options = { uploadDir: IMG_FILES_DIR, keepExtensions: true }) => {
  const form = IncomingForm();
  form.req = req;
  Object.keys(options).forEach(option => form[option] = options[option]);

  return form;
}