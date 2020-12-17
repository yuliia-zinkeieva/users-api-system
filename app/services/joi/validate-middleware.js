const ValidationError = require('../errors/ValidationError');
const _ = require('lodash');

module.exports = function (schema, path) {
    let validation = null;
    return function (req, res, next) {
        validation = schema.validate(_.get(req, path));
        if (validation.error) {
            const field = validation.error.message.split(' ')[0];
            next(new ValidationError('Validation fault', {field: field.slice(1, field.length - 1)}));
        }
        next();
    }
}