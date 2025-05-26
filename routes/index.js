const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/main");
});

router.use("/api", require("../routes/coordinatorRoutes.js"));

// Usa as rotas de projetos em /api
router.use("/api", require("../routes/employeeRoutes.js"));

// Usa as rotas de tarefas em /api
router.use("/api", require("../routes/taskRoutes.js"));

module.exports = router;

