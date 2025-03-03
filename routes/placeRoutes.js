const express = require("express");
const router = express.Router();
const placeController = require("../controllers/placeController");
const auth = require("../middlewares/authMiddleware");

// CRUD Lieux
router.post("/",  placeController.createPlace);
router.get("/", placeController.getAllPlaces);
router.get("/:id", placeController.getPlaceById);
router.put("/:id",  placeController.updatePlace);
router.delete("/:id",  placeController.deletePlace);

// Récupérer les lieux autour d'un utilisateur
router.get("/nearby", placeController.getNearbyPlaces);

module.exports = router;
