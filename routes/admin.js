const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const adminCtrl = require("../controllers/admin");
const userCtrl = require("../controllers/user");

//********** route pour creer un compte admin et connexion admin **********
//********** seul les admins peuvent créer un autres compte admin **********

router.post("/signup", admin, adminCtrl.signup);

module.exports = router;
