const express = require('express');
const router = express.Router();
const friendshipController = require('../controllers/friendshipController');

// 📌 Routes CRUD pour les abonnements
router.post('/follow', friendshipController.followUser); // Suivre un utilisateur
router.delete('/unfollow', friendshipController.unfollowUser); // Se désabonner d’un utilisateur
router.get('/following/:userId', friendshipController.getFollowing); // Voir les abonnements d’un utilisateur
router.get('/followers/:userId', friendshipController.getFollowers); // Voir les abonnés d’un utilisateur
router.get('/followers/count/:userId', friendshipController.getFollowersCount); // Nombre de followers d'un utilisateur
router.get('/following/count/:userId', friendshipController.getFollowingCount); // Nombre de personnes suivies


module.exports = router;
