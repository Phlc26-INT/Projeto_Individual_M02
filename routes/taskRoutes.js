const { Router } = require("express");
const c = require("../controllers/taskController.js");
const router = express.Router();

router.get('/', c.read);
router.post('/', c.create);
router.get('/:id', c.readById);
router.put('/:id', c.update);
router.delete('/:id', c.delete);

module.exports = router; 