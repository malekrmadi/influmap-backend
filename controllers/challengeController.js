const Challenge = require('../models/Challenge');

// 📌 Créer un défi
exports.createChallenge = async (req, res) => {
    try {
        const { title, description, reward, startDate, endDate } = req.body;

        const newChallenge = new Challenge({
            title,
            description,
            reward,
            startDate,
            endDate
        });

        await newChallenge.save();
        res.status(201).json({ message: "Défi créé avec succès", challenge: newChallenge });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Modifier un défi
exports.updateChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const { title, description, reward, startDate, endDate } = req.body;

        const updatedChallenge = await Challenge.findByIdAndUpdate(challengeId, {
            title, description, reward, startDate, endDate
        }, { new: true });

        if (!updatedChallenge) {
            return res.status(404).json({ message: "Défi non trouvé" });
        }

        res.json({ message: "Défi mis à jour", challenge: updatedChallenge });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Supprimer un défi
exports.deleteChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;

        const deletedChallenge = await Challenge.findByIdAndDelete(challengeId);
        if (!deletedChallenge) {
            return res.status(404).json({ message: "Défi non trouvé" });
        }

        res.json({ message: "Défi supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Voir les défis disponibles
exports.getChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find({});
        res.json({ challenges });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
