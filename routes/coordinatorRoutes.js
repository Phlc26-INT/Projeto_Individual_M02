const { Router } = require("express");
const c = require("../controllers/coordinatorController.js");
const router = express.Router();const r = Router();

router.get("/coordinator", c.read);
router.post("/coordinator", c.create);
router.get("/coordinator/:id", c.readById);
router.put("/coordinator/:id", c.update);
router.delete("/coordinator/:id", c.delete);

module.exports = router;
