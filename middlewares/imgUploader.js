import HttpErrors from "http-errors";
import multer from "multer";

const uploader = multer({
    storage: multer.memoryStorage({}),
    fileFilter(req, file, cb) {
        if (['img/png', 'img/jpeg'].includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(HttpErrors(422, 'Invalid file type'), false);
        }
    }
});

export default uploader;


