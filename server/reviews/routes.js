const router = require("express").Router()
const auth = require(".././middleware/authmw");
const reviewController = require("./controller")
const verifyAdmin = require("../middleware/adminmw");

router.post("/add", auth, reviewController.add);
router.delete("/remove/:userID/:movieID", auth,verifyAdmin, reviewController.remove);
router.get("/get/:userID", auth, reviewController.get);

module.exports = router