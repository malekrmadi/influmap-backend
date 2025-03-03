const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // utilisateur qui suit
    followingId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // utilisateur suivi
}, { timestamps: true });

const Friendship = mongoose.model('Friendship', friendshipSchema);

module.exports = Friendship;
