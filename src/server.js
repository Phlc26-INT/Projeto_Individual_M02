const express = require("express");
const app = express();
const PORT = 3000;
const routes = require("./routes/index");
const empRouter = require("./routes/employeeRoutes");
const coordRouter = require("./routes/coordinatorRoutes");
const taskRouter = require("./routes/taskRoutes");
const path = require("path");

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/", routes);

app.use("/employee", empRouter);
app.use("/coordinator", coordRouter);
app.use("/task", taskRouter);


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
