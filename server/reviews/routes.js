const router = require("express").Router()
const auth = require(".././middleware/authmw");
const reviewController = require("./controller")
const verifyAdmin = require("../middleware/adminmw");

router.post("/add", auth, reviewController.add);
router.delete("/remove/:reviewId", auth,verifyAdmin, reviewController.remove);
router.get("/reported-reviews/", auth,verifyAdmin, reviewController.getReportedReviews);
router.get("/get-by-user/:userID", auth, reviewController.getByUser);
router.get("/get-by-movie/:movieID", auth, reviewController.getByMovie);

module.exports = router