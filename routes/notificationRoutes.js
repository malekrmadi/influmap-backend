const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

// 📌 Routes CRUD pour les notifications
router.post('/send', notificationController.sendNotification); // Envoyer une notification
router.put('/read/:notificationId', notificationController.readNotification); // Marquer une notification comme lue
router.get('/:userId', notificationController.getNotifications); // Récupérer les notifications d’un utilisateur

module.exports = router;
