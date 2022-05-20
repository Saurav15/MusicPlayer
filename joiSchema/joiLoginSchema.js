const Joi = require('joi');

const joiUserLoginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
})

module.exports = joiUserLoginSchema;