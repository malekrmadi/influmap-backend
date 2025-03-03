const Friendship = require('../models/Friendship');

// 📌 Suivre un utilisateur
exports.followUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        // Vérifier si l'abonnement existe déjà
        const existingFriendship = await Friendship.findOne({ followerId, followingId });
        if (existingFriendship) {
            return res.status(400).json({ message: "Vous suivez déjà cet utilisateur." });
        }

        const newFriendship = new Friendship({ followerId, followingId });
        await newFriendship.save();
        res.status(201).json({ message: "Abonnement réussi", friendship: newFriendship });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Se désabonner d’un utilisateur
exports.unfollowUser = async (req, res) => {
    try {
        const { followerId, followingId } = req.body;

        const friendship = await Friendship.findOneAndDelete({ followerId, followingId });
        if (!friendship) return res.status(404).json({ message: "Vous ne suivez pas cet utilisateur." });

        res.json({ message: "Désabonnement réussi." });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Voir les abonnements d’un utilisateur (Qui il suit)
exports.getFollowing = async (req, res) => {
    try {
        const following = await Friendship.find({ followerId: req.params.userId }).populate('followingId', 'username avatar');
        res.json(following);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Voir les abonnés d’un utilisateur (Qui le suit)
exports.getFollowers = async (req, res) => {
    try {
        const followers = await Friendship.find({ followingId: req.params.userId }).populate('followerId', 'username avatar');
        res.json(followers);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
