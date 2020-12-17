const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const imageValidation = require('../imageValidation')
const checkData = require('../joi/customersValidation')
const ValidationError = require('../errors/ValidationError')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const id = uuidv4();
        const ext = file.mimetype.split('/')[1]
        cb(null, id + '.' + ext);
    }
});

const upload = multer({storage: storage, fileFilter: imageValidation}).fields([
    {name: 'image'},
    {name: 'info'}
]);


module.exports = function (req, res) {
    return new Promise(function (resolve, reject) {
        upload(req, res, function (err) {
            if (err !== undefined) return reject(err);
            console.log('here', req.files)
            if (Object.keys(req.files).length === 0 ){
                console.log('error file')
                // return reject(new ValidationError('Validation fault', {field: 'file, please attach a one'}))
                resolve({data: JSON.parse(req.body.info)})
            }

            const cust = JSON.parse(req.body.info)
            console.log('upload', cust)
            const customerData = {data: JSON.parse(req.body.info), file: req.files.image}
            checkData(customerData.data, reject)
            resolve(customerData);
        });
    });
}