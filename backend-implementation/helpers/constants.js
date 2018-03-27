export const IMG_FILES_DIR = 'public/images';
export const FILE_UPLOAD_SUCCESS = 'File(s) have been successfully uploaded';
export const FILE_DOWNLOAD_SUCCESS = 'File(s) have been successfully downloaded';
export const DEFAULT_DEV_PATH = 'http://localhost:8080';
export const DEFAULT_PROD_PATH = 'https://pictures-denoising.com';

export const RESPONSE = {
    SUCCESS: 200,
    CREATED: 201,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ERROR: 500
};

export const MESSAGES = {
    200: 'The Operation Succeeded',
    201: 'New Record has been created.',
    403: 'Permission Denied',
    404: 'Not Found',
    500: 'Internal Server Error'
};

export const MAX_FILE_SIZE = {
    size: 5000000,
    msg: 'Max file size is 5MB'
};

export const FORM_BUILDER_OPTIONS = {
    uploadDir: `${IMG_FILES_DIR}/uploads`,
    downloadDir: `${IMG_FILES_DIR}/downloads`,
    keepExtensions: true,
    multiples: true,
    maxFileSize: MAX_FILE_SIZE.size
};