const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
}).unknown(false);

const registerSchema = Joi.object({
    name: Joi.string().trim().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    profilePicture: Joi.string().uri().optional(),
}).unknown(false);

const validateRegister = (req, res, next) => {
    const payload = req.body;
    const { error } = registerSchema.validate(payload, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    return next();
};

const validateLogin = (req, res, next) => {
    const payload = req.body;
    const { error } = loginSchema.validate(payload, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    return next();
};

module.exports = { validateLogin, validateRegister }