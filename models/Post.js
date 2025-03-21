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


/* 
{
    "userId": "603dcd12fc13ae4567000001",
    "placeId": "603dcd12fc13ae4567000002",
    "userId": "603dcd12fc13ae4567000001",
    "placeId": "603dcd12fc13ae4567000002",
    "type": "Story",
    "media": ["https://example.com/image1.jpg", "https://example.com/video1.mp4"],
    "text": "Superbe coucher de soleil ici !",
    "expiresAt": "2025-03-10T12:00:00Z"
}
*/
