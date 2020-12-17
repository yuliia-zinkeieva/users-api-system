const customerSchema = require('./customerSchema')
const ValidationError = require('../errors/ValidationError');

module.exports = function (data, reject) {
    const validation = customerSchema.validate(data);
    if (validation.error) {
        const field = validation.error.message.split(' ')[0];
        reject(new ValidationError('Validation fault', {field: field.slice(1, field.length - 1)}));
    }
}