const Business = require('../models/Business');

// 📌 Inscrire un business
exports.createBusiness = async (req, res) => {
    try {
        const { ownerId, placeId, subscriptionPlan, offers, analytics } = req.body;

        const newBusiness = new Business({
            ownerId,
            placeId,
            subscriptionPlan,
            offers,
            analytics
        });

        await newBusiness.save();
        res.status(201).json({ message: "Business inscrit avec succès", business: newBusiness });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Modifier les offres d'un business
exports.updateOffers = async (req, res) => {
    try {
        const { businessId } = req.params;
        const { offers } = req.body;

        const updatedBusiness = await Business.findByIdAndUpdate(businessId, { offers }, { new: true });
        if (!updatedBusiness) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        res.json({ message: "Offres mises à jour", business: updatedBusiness });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Supprimer un business
exports.deleteBusiness = async (req, res) => {
    try {
        const { businessId } = req.params;

        const deletedBusiness = await Business.findByIdAndDelete(businessId);
        if (!deletedBusiness) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        res.json({ message: "Business supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Récupérer les stats et les offres d'un business
exports.getBusinessStatsAndOffers = async (req, res) => {
    try {
        const { businessId } = req.params;

        const business = await Business.findById(businessId);
        if (!business) {
            return res.status(404).json({ message: "Business non trouvé" });
        }

        res.json({
            analytics: business.analytics,
            offers: business.offers
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
