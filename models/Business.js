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


/* 
{
    "ownerId": "603dcd12fc13ae4567000001",
    "placeId": "603dcd12fc13ae4567000002",
    "subscriptionPlan": "Premium",
    "offers": ["20% de réduction", "Offre spéciale sur les cocktails"],
    "analytics": {
        "views": 1200,
        "visits": 300
    }
}
*/
