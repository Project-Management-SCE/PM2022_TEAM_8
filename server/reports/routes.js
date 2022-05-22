const router = require("express").Router()
const auth = require(".././middleware/authmw");
const reportController = require("./controller")
const verifyAdmin = require("../middleware/adminmw");

router.get("/getAll",verifyAdmin, auth, reportController.getAll);
router.get("/get/:userID", verifyAdmin, auth, reportController.get);
router.post("/report", auth, reportController.report);
module.exports = router