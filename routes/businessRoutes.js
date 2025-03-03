const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');

// 📌 Routes CRUD pour les business
router.post('/register', businessController.createBusiness); // Inscription en tant que business
router.put('/update-offers/:businessId', businessController.updateOffers); // Modifier les offres
router.delete('/delete/:businessId', businessController.deleteBusiness); // Supprimer un business
router.get('/:businessId/stats-and-offers', businessController.getBusinessStatsAndOffers); // Voir les stats et les offres

module.exports = router;
