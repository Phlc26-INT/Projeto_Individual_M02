const express = require("express");
const controllerTasks = require("../controllers/taskController.js");
const router = express.Router();

router.get('/', controllerTasks.read);
router.post('/', controllerTasks.create);
router.get('/:id', controllerTasks.readById);
router.put('/:id', controllerTasks.update);
router.delete('/:id', controllerTasks.delete);

module.exports = router; 