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
        (department, email, username, password, name, is_coord)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        employee.department,
        employee.email,
        employee.username,
        employee.password,
        employee.name,
        employee.is_coord ?? false,
      ]
    );
    return { ...employee, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, department, email, username, password, name, is_coord 
       FROM employee`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, department, email, username, password, name, is_coord 
       FROM employee 
       WHERE id = $1`,
      [id]
    );
    console.log("Resultado da consulta:", result.rows);
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload);
    await db.query(
      `UPDATE employee 
       SET department = $1, email = $2, username = $3, password = $4, name = $5, is_coord = $6 
       WHERE id = $7`,
      [
        payload.department,
        payload.email,
        payload.username,
        payload.password,
        payload.name,
        payload.is_coord ?? false,
        id,
      ]
    );
    return this.findById(id);
  },

  async remove(id) {
    await db.query("DELETE FROM employee WHERE id = $1", [id]);
  },
};
