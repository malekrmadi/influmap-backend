const Place = require("../models/Place");

// ➤ Créer un lieu
exports.createPlace = async (req, res) => {
  try {
    const place = new Place(req.body);
    await place.save();
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création", error });
  }
};

// ➤ Récupérer tous les lieux
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ➤ Récupérer un lieu par ID
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Lieu introuvable" });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ➤ Modifier un lieu
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) return res.status(404).json({ message: "Lieu introuvable" });
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour", error });
  }
};

// ➤ Supprimer un lieu
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: "Lieu introuvable" });
    res.status(200).json({ message: "Lieu supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ➤ Récupérer les lieux autour d’un utilisateur
exports.getNearbyPlaces = async (req, res) => {
  try {
    const { latitude, longitude, maxDistance = 5 } = req.query;

    if (!latitude || !longitude)
      return res.status(400).json({ message: "Coordonnées requises" });

    const places = await Place.find({
      "location.latitude": { $gte: latitude - 0.1, $lte: latitude + 0.1 },
      "location.longitude": { $gte: longitude - 0.1, $lte: longitude + 0.1 },
    });

    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ➤ Récupérer les lieux par catégorie
exports.getPlacesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const validCategories = ["Restaurant", "Café", "Bar", "Événement", "Autre"];

    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Catégorie invalide" });
    }

    const places = await Place.find({ category });
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

