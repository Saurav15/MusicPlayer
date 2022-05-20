const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string(),

    repeat_password: Joi.ref('password')
});

module.exports = userSchema

    