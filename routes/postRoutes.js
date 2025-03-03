const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 📌 Routes CRUD pour les publications
router.post('/', postController.createPost); // Ajouter une publication
router.delete('/:id', postController.deletePost); // Supprimer une publication
router.get('/place/:placeId', postController.getPostsByPlace); // Voir les publications d’un lieu
router.get('/user/:userId', postController.getPostsByUser); // Voir les publications d’un utilisateur

module.exports = router;
