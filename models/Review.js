const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "Place", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    media: { type: [String], default: [] }, // URLs des images/vidéos
    verified: { type: Boolean, default: false }, // Géolocalisation validée ?
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);


/* 
{
    "userId": "603dcd12fc13ae4567000001",
    "placeId": "603dcd12fc13ae4567000002",
    "rating": 5,
    "comment": "Super endroit, ambiance agréable !",
    "media": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    "verified": true
}
*/
