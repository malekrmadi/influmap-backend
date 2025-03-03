const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Référence au propriétaire
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true }, // Référence au lieu
    subscriptionPlan: { 
        type: String, 
        enum: ['Free', 'Premium'], 
        required: true 
    }, // Plan d'abonnement
    offers: { 
        type: [String], // Liste des offres spéciales
        default: [] 
    },
    analytics: { 
        type: Object, // Données de fréquentation (peut être un objet complexe)
        default: {}
    }
}, { timestamps: true });

const Business = mongoose.model('Business', businessSchema);

module.exports = Business;
