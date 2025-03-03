const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence à l'utilisateur
    type: { type: String, enum: ['Nouveau follow', 'Nouveau commentaire'], required: true }, // Type de notification
    message: { type: String, required: true }, // Message de la notification
    isRead: { type: Boolean, default: false }, // Si la notification a été lue ou non
}, { timestamps: true });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
