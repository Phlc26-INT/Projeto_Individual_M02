const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
    coordId: Joi.string().uuid(),
    department: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required().max(100),
    username: Joi.string().required().min(3).max(100),
    password: Joi.string().required().min(6).max(100),
    name: Joi.string().required().min(2).max(100),
    isCoord: Joi.boolean().required().default(false)

});