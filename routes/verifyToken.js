const express = require("express");
const router = express.Router();
const verifyCtrl = require("../controllers/verifyToken");
const verifyTokenFunc = require("../middleware/verifyTokenFunc");

router.get("/verify-token", verifyTokenFunc, verifyCtrl.verifyToken);

module.exports = router;
