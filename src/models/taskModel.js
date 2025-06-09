const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
    task_id: Joi.string().uuid(),
    emp_id: Joi.string().uuid().allow(null),
    coord_id: Joi.string().uuid().allow(null),
    task_description: Joi.string().allow(null, ""),
    task_type: Joi.string().allow(null, ""),
    init_date: Joi.date().required(),
    due_date: Joi.date().required(),
    is_coord: Joi.boolean().default(false)
});
