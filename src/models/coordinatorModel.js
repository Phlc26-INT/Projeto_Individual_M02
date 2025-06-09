const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
    coord_id: Joi.string().uuid(),
    department: Joi.string().required().min(2).max(100),
    email: Joi.string().email().required().max(100),
    coord_username: Joi.string().required().min(3).max(100),
    coord_password: Joi.string().required().min(6).max(100),
    name: Joi.string().required().min(2).max(100),
    is_coord: Joi.boolean().default(true)

});