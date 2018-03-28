export const IMG_FILES_DIR = 'public/images';
export const FILE_UPLOAD_SUCCESS = 'File(s) have been successfully uploaded';
export const DEFAULT_DEV_PATH = 'http://localhost:8080';
export const DEFAULT_PROD_PATH = 'https://pictures-denoising.com';

export const RESPONSE = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    NOT_SUPPORTED: 415,
    ERROR: 500,
    NOT_IMPLEMENTED: 501,
    DB_DOWN: 503
};

export const MESSAGES = {
    200: 'The Operation Succeeded',
    201: 'New Record Has Been Created',
    400: 'Bad Request',
    401: 'You Must Sign In To Continue Your Action',
    403: 'Permission Denied',
    404: 'Not Found',
    405: 'Method Is Not Allowed',
    406: 'Media Type is Unacceptable',
    415: 'Media Type is Not Supported',
    500: 'Internal Server Error',
    501: 'Unrecognized/Not Implemented Method',
    503: 'Service Unavailable'
};

export const MAX_FILE_SIZE = {
    size: 5000000,
    msg: 'Max File Size Is 5MB'
};

export const FORM_BUILDER_OPTIONS = {
    uploadDir: `${IMG_FILES_DIR}/uploads`,
    downloadDir: `${IMG_FILES_DIR}/downloads`,
    keepExtensions: true,
    multiples: true,
    maxFileSize: MAX_FILE_SIZE.size
};