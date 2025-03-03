const express = require('express');
const router = express.Router();
const challengeController = require('../controllers/challengeController');

// 📌 Routes CRUD pour les défis
router.post('/create', challengeController.createChallenge); // Créer un défi
router.put('/update/:challengeId', challengeController.updateChallenge); // Modifier un défi
router.delete('/delete/:challengeId', challengeController.deleteChallenge); // Supprimer un défi
router.get('/all', challengeController.getChallenges); // Voir les défis disponibles

module.exports = router;
