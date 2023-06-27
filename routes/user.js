const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

router.post("/add-adresse/:userId", auth, userCtrl.addAdresse);

router.delete("/delete-one-user", admin, userCtrl.deleteAllUsers);
router.delete("/delete-one-user/:userId", admin, userCtrl.deleteOneUsers);

module.exports = router;
