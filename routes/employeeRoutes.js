const { Router } = require("express");
const c = require("../controllers/employeeController.js");
const router = express.Router();

router.get("/employee", c.read);
router.post("/employee", c.create);
router.get("/employee/:id", c.readById);
router.put("/employee/:id", c.update);
router.delete("/employee/:id", c.delete);

module.exports = router;
