const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Place', required: true },
    type: { type: String, enum: ['Story', 'Highlight'], required: true },
    media: [{ type: String, required: true }], // URLs des images/vidéos
    text: { type: String, default: '' },
    expiresAt: { type: Date }, // Date d'expiration pour les stories
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
