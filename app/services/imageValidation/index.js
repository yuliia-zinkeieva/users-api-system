// const imageFilter
const ValidationError = require('../errors/ValidationError')

module.exports = function (req, file, cb) {
    // Accept images only
    console.log('file validation')
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        // req.fileValidationError = 'Only image files are allowed!';
        return cb(new ValidationError('Validation fault', {field: 'extension of file, only images'}), false);

    }
    console.log('file is ok')
    cb(null, true);
};
// exports.imageFilter = imageFilter;