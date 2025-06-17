const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/home");
});

router.get("/employees", (req, res) => {
    res.render("pages/employees");
});

router.get("/tasks", (req, res) => {
    res.render("pages/tasks");
});

router.use("/api/coordinator", require("./coordinatorRoutes.js"));

router.use("/api/employee", require("./employeeRoutes.js"));

router.use("/api/task", require("./taskRoutes.js"));

module.exports = router;

