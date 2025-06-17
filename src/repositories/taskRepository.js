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
        (emp_id, coord_id, task_description, task_type, init_date, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING task_id`,
      [
        task.emp_id,
        task.coord_id,
        task.task_description,
        task.task_type,
        task.init_date,
        task.due_date,
      ]
    );
    return { ...task, id: result.rows[0].id };
  },  async findAll() {
    const result = await db.query(
      `SELECT t.*, e.name as employee_name
       FROM tasks t
       LEFT JOIN employee e ON t.emp_id = e.emp_id
       ORDER BY t.task_id`
    );
    return result.rows;
  },  async findByID(id) {
    const result = await db.query(
      `SELECT t.*, e.name as employee_name
       FROM tasks t
       LEFT JOIN employee e ON t.emp_id = e.emp_id
       WHERE t.task_id = $1`,
      [id]
    );
    return result.rows[0];
  },
  async update(id, task) {
    task = await validate(task);

    await db.query(
      `UPDATE tasks 
       SET emp_id = $1,
           coord_id = $2,
           task_description = $3,
           task_type = $4,
           init_date = $5,
           due_date = $6
       WHERE task_id = $7`,
      [
        task.emp_id,
        task.coord_id,
        task.task_description,
        task.task_type,
        task.init_date,
        task.due_date
      ]
    );
    return this.findByID(id);
  },

  async remove(id) {
    await db.query("DELETE FROM tasks WHERE task_id = $1", [id]);
  },
};
