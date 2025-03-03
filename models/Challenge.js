const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Titre du défi
    description: { type: String, required: true }, // Description du défi
    reward: { 
        type: String, 
        enum: ['Points', 'Badge', 'Offre'], 
        required: true 
    }, // Récompense
    startDate: { type: Date, required: true }, // Date de début
    endDate: { type: Date, required: true }, // Date de fin
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = Challenge;
