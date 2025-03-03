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
