const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const deconnexionCtrl = require("../controllers/deconnexion");

router.post("/add-inactive-token", deconnexionCtrl.deconnexion);

module.exports = router;
