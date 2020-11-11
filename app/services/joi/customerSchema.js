const Joi = require('joi');

const customerSchema = Joi.object().keys({ //user sign up schema
    email: Joi.string().email().lowercase().required(),
    firstname: Joi.string().regex(/^[A-Z]+$/).uppercase().required()
}).with('email', 'firstname');

module.exports = customerSchema;


