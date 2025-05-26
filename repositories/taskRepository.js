const db = require("../config/db.js");
const schema = require("../models/taskModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(task) {
    task = await validate(task);

    const result = await db.query(
      `INSERT INTO tasks
        (empId, coordId, taskDescription, taskType, initDate, dueDate, isCoord)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        task.empId,
        task.coordId,
        task.taskDescription,
        task.taskType,
        task.initDate,
        task.dueDate,
        task.isCoord ?? false,
      ]
    );
    return { ...task, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, empId, coordId, taskDescription, taskType, initDate, dueDate, isCoord
       FROM tasks`
    );
    return result.rows;
  },

  async findByID(id) {
    const result = await db.query(
      `SELECT id, empId, coordId, taskDescription, taskType, initDate, dueDate, isCoord
       FROM tasks
       WHERE id = $1`,
      [id]
    );
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload);

    await db.query(
      `UPDATE tasks 
       SET empId = $1,
           coordId = $2,
           taskDescription = $3,
           taskType = $4,
           initDate = $5,
           dueDate = $6,
           isCoord = $7,
       WHERE task_id = $10`,
      [
        payload.empId,
        payload.coordId,
        payload.taskDescription,
        payload.taskType,
        payload.initDate,
        payload.dueDate,
        payload.isCoord ?? false,
        id,
      ]
    );
    return this.findByID(id);
  },

  async remove(id) {
    await db.query("DELETE FROM tasks WHERE id = $1", [id]);
  },
};
