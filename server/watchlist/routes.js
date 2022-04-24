const router = require("express").Router()
const auth = require(".././middleware/authmw");
const watchlistController = require("./controller")

router.get("/get",auth,watchlistController.get);
router.post("/add", auth,watchlistController.add);
router.delete("/remove", auth, watchlistController.remove);
module.exports = router