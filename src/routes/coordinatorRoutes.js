const express = require("express");
const controllerCoordinator = require("../controllers/coordinatorController.js");
const router = express.Router();

router.get("/", controllerCoordinator.read);
router.post("/", controllerCoordinator.create);
router.get("/:id", controllerCoordinator.readById);
router.put("/:id", controllerCoordinator.update);
router.delete("/:id", controllerCoordinator.delete);

module.exports = router;
