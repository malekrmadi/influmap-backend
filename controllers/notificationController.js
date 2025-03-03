const Notification = require('../models/Notification');

// 📌 Envoyer une notification
exports.sendNotification = async (req, res) => {
    try {
        const { userId, type, message } = req.body;

        const newNotification = new Notification({
            userId,
            type,
            message,
        });

        await newNotification.save();
        res.status(201).json({ message: "Notification envoyée avec succès", notification: newNotification });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Marquer une notification comme lue
exports.readNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
        if (!notification) {
            return res.status(404).json({ message: "Notification non trouvée" });
        }

        res.json({ message: "Notification lue", notification });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Récupérer les notifications d’un utilisateur
exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.params.userId });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
