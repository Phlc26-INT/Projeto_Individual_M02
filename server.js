const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const db = require('./config/db');


app.use(express.json());

const routes = require("./routes/index");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
