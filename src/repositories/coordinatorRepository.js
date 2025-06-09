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
        (department, email, coord_username, coord_password, name, is_coord)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING coord_id`,
      [
        coordinator.department,
        coordinator.email,
        coordinator.coord_username,
        coordinator.coord_password,
        coordinator.name,
        coordinator.is_coord ?? true,
      ]
    );
    return { ...coordinator, id: result.rows[0].id };
  },

  async findAll() {
    const result = await db.query(
      `SELECT coord_id, department, email, coord_username, coord_password, name, is_coord 
       FROM coordinator`
    );
    return result.rows;
  },

  async findById(id) {
    const result = await db.query(
      `SELECT coord_id, department, email, coord_username, coord_password, name, is_coord 
       FROM coordinator 
       WHERE coord_id = $1`,
      [id]
    );
    console.log("Resultado da consulta:", result.rows);
    return result.rows[0];
  },

  async update(id, coordinator) {
    coordinator = await validate(coordinator);
    await db.query(
      `UPDATE coordinator 
       SET department = $1, email = $2, coord_username = $3, coord_password = $4, name = $5, is_coord = $6 
       WHERE coord_id = $7`,
      [
        coordinator.department,
        coordinator.email,
        coordinator.coord_username,
        coordinator.coord_password,
        coordinator.name,
        coordinator.is_coord ?? true,
        [id],
      ]
    );
    return this.findById(id);
  },

  async remove(id) {
    await db.query("DELETE FROM coordinator WHERE coord_id = $1", [id]);
  },
};
