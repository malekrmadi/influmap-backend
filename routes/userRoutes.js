const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');


// Routes CRUD + Auth
router.post('/signup', userController.createUser); // Créer un utilisateur
router.post('/login', userController.loginUser); // Authentification
router.get('/:id',  userController.getUserById); // Lire un utilisateur
router.put('/:id',  userController.updateUser); // Modifier un utilisateur
router.delete('/:id', userController.deleteUser); // Supprimer un utilisateur
router.get('/', userController.getAllUsers); // Récupérer tous les utilisateurs


module.exports = router;
