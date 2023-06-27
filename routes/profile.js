const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");

router.get("/", admin, userCtrl.getAllUsers);
router.get("/:userId", auth, userCtrl.getOneUser);

module.exports = router;
