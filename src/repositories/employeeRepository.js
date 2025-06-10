const db = require("../config/db.js");
const schema = require("../models/employeeModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(employee) {
    employee = await validate(employee);
    const result = await db.query(
      `INSERT INTO employee 
        (department, email, emp_username, emp_password, name, is_coord)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING emp_id`,
      [
        employee.department,
        employee.email,
        employee.emp_username,
        employee.emp_password,
        employee.name,
        employee.is_coord ?? false,
      ]
    );
    return { ...employee, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT * FROM employee`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT * 
       FROM employee 
       WHERE emp_id = $1`,
      [id]
    );
    console.log("Resultado da consulta:", result.rows);
    return result.rows[0];
  },

  async update(id, employee) {
    employee = await validate(employee);
    await db.query(
      `UPDATE employee 
       SET department = $1, email = $2, emp_username = $3, emp_password = $4, name = $5, is_coord = $6 
       WHERE emp_id = $7`,
      [
        employee.department,
        employee.email,
        employee.emp_username,
        employee.emp_password,
        employee.name,
        employee.is_coord ?? false,
        id,
      ]
    );
    return this.findById(id);
  },

  async remove(id) {
    await db.query("DELETE FROM employee WHERE emp_id = $1", [id]);
  },
};
