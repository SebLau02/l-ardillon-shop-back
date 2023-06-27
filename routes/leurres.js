const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const leurresCtrl = require("../controllers/leurres");
const express = require("express");

const router = express.Router();

//********** route pour récuperer tout ou 1 leurre ou une catégorie de leurre, accès publique **********

router.get("/", leurresCtrl.getAllLeurre);
router.get("/:leurreId", leurresCtrl.getOneLeurre);

//********** route pour page de paimment avec auth comme middleware avant celui du paiment pour vérifier si c'est un utilisateur connecté si non redirection vers création de compte **********

//********** route pour modifier, ajouter, supprimmer un produit, accès uniquement au admins **********

router.post("/", admin, leurresCtrl.createLeurre);
router.post("/:leurreId", admin, leurresCtrl.addColorToLeurre);

router.put("/modify-lure/:leurreId", admin, leurresCtrl.modifyOneLeurre);
router.put("/stock-management", admin, leurresCtrl.stockManagement);

router.delete("/delete", admin, leurresCtrl.deleteAllLeurre);
router.delete("/delete/:leurreId", admin, leurresCtrl.deleteOneLeurre);
router.delete(
	"/delete/delete-ref-declination",
	admin,
	leurresCtrl.deleteOneLureRef
);

module.exports = router;
