export const RESPONSE = {
    SUCCESS: 200,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    ERROR: 500
};

export const MESSAGES = {
    200: 'The Operation Succeeded',
    403: 'Permission Denied',
    404: 'Not Found',
    500: 'Internal Server Error'
};

export const MAX_FILE_SIZE = {
    size: 5000000,
    msg: 'Max file size is 5MB'
};

export const IMG_FILES_DIR = 'public/images';
export const FILE_UPLOAD_SUCCESS = 'File(s) have been successfully uploaded';
export const DEFAULT_DEV_PATH = 'http://localhost:8080';
export const DEFAULT_PROD_PATH = 'https://pictures-denoising.com';