const router = require("express").Router()
const auth = require(".././middleware/authmw");
const reportController = require("./controller")
const verifyAdmin = require("../middleware/adminmw");

router.get("/get/:id", auth,verifyAdmin, reportController.get);
router.post("/report-add", auth, reportController.report);
module.exports = router