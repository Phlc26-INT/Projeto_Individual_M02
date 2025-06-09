const express = require("express");
const controllerEmployee = require("../controllers/employeeController.js");
const router = express.Router();

router.get("/", controllerEmployee.read);
router.post("/", controllerEmployee.create);
router.get("/:id", controllerEmployee.readById);
router.put("/:id", controllerEmployee.update);
router.delete("/:id", controllerEmployee.delete);

module.exports = router;
