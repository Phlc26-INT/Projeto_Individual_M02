const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();
const db = require('../config/db');

const runSQLScript = async () => {
  const filePath = path.join(__dirname, '202506051610.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    await db.query(sql);
    console.log('Script SQL executado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err);
  }
};

runSQLScript();