const db = require("../config/db.js");
const schema = require("../models/coordinatorModel.js");

async function validate(data) {
  const { error, value } = schema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
}

module.exports = {
  async create(coordinator) {
    coordinator = await validate(coordinator);
    const result = await db.query(
      `INSERT INTO coordinator 
        (department, email, username, password, name, is_coord)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        coordinator.department,
        coordinator.email,
        coordinator.username,
        coordinator.password,
        coordinator.name,
        coordinator.is_coord ?? true,
      ]
    );
    return { ...coordinator, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT id, department, email, username, password, name, is_coord 
       FROM coordinator`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT id, department, email, username, password, name, is_coord 
       FROM coordinator 
       WHERE id = $1`,
      [id]
    );
    console.log("Resultado da consulta:", result.rows);
    return result.rows[0];
  },

  async update(id, payload) {
    payload = await validate(payload);
    await db.query(
      `UPDATE coordinator 
       SET department = $1, email = $2, username = $3, password = $4, name = $5, is_coord = $6 
       WHERE id = $7`,
      [
        payload.department,
        payload.email,
        payload.username,
        payload.password,
        payload.name,
        payload.is_coord ?? true,
        id,
      ]
    );
    return this.findById(id);
  },

  async remove(id) {
    await db.query("DELETE FROM coordinator WHERE id = $1", [id]);
  },
};
