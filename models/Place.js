const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["Restaurant", "Café", "Bar", "Événement", "Autre"],
      required: true,
    },
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", PlaceSchema);


/* 
{
    "name": "Le Petit Bistro",
    "description": "Un charmant restaurant français au cœur de la ville.",
    "category": "Restaurant",
    "location": {
        "latitude": 48.8566,
        "longitude": 2.3522
    },
    "rating": 4.5,
    "reviewsCount": 120,
    "tags": ["Français", "Gastronomie", "Terrasse"]
}
*/
