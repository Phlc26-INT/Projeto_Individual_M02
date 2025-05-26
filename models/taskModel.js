const { pool } = require("../config/db.js");
const Joi = require("joi");

module.exports = Joi.object({
    taskId: Joi.string().uuid(),
    empId: Joi.string().uuid().allow(null),
    coordId: Joi.string().uuid().allow(null),
    taskDescription: Joi.string().allow(null, ""),
    taskType: Joi.string().allow(null, ""),
    initDate: Joi.date().required(),
    dueDate: Joi.date().required(),
    isCoord: Joi.boolean().required().default(false)
});
