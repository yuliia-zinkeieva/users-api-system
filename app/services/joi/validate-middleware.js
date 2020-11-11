const ValidationError = require('../errors/ValidationError');
const _ = require('lodash');

module.exports = function (schema, path) {
    return function (req, res, next) {
        const validation = schema.validate(_.get(req, path));
        //console.log(validation.error.message.split(' ')[0]);
        if (validation.error) {
            const field = validation.error.message.split(' ')[0];

            next(new ValidationError('Validation fault', {field: field.slice(1,field.length-1)}));

        }

        next();
    }
}