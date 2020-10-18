const Joi = require('joi');

const schema = Joi.object().keys({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required()
}).with('email', 'password');

module.exports = schema;


