const Review = require("../models/Review");
const Place = require("../models/Place");

// ➤ Ajouter un avis
exports.createReview = async (req, res) => {
    try {
      const { userId, placeId, rating, comment, media, verified } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: "userId est requis" });
      }
  
      const review = new Review({ userId, placeId, rating, comment, media, verified });
      await review.save();
  
      // Mettre à jour le rating moyen du lieu
      const reviews = await Review.find({ placeId });
      const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  
      await Place.findByIdAndUpdate(placeId, {
        rating: averageRating,
        reviewsCount: reviews.length,
      });
  
      res.status(201).json(review);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de l'ajout", error });
    }
  };
  

// ➤ Modifier un avis
exports.updateReview = async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "userId est requis" });
      }
  
      const review = await Review.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!review) return res.status(404).json({ message: "Avis introuvable ou non autorisé" });
  
      res.status(200).json(review);
    } catch (error) {
      res.status(400).json({ message: "Erreur lors de la mise à jour", error });
    }
  };
  
// ➤ Supprimer un avis
exports.deleteReview = async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "userId est requis" });
      }
  
      const review = await Review.findOneAndDelete({ _id: req.params.id, userId });
  
      if (!review) return res.status(404).json({ message: "Avis introuvable ou non autorisé" });
  
      // Mise à jour du rating du lieu
      const reviews = await Review.find({ placeId: review.placeId });
      const averageRating = reviews.length
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
  
      await Place.findByIdAndUpdate(review.placeId, {
        rating: averageRating,
        reviewsCount: reviews.length,
      });
  
      res.status(200).json({ message: "Avis supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  };
  
// ➤ Récupérer les avis d’un lieu
exports.getReviewsByPlace = async (req, res) => {
  try {
    const reviews = await Review.find({ placeId: req.params.placeId }).populate("userId", "username avatar");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
