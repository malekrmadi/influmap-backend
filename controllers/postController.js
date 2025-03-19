const Post = require('../models/Post');


// 📌 Récupérer toutes les publications
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userId', 'username avatar').populate('placeId', 'name category');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Ajouter une publication
exports.createPost = async (req, res) => {
    try {
        const { userId, placeId, type, media, text, expiresAt } = req.body;
        const newPost = new Post({ userId, placeId, type, media, text, expiresAt });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Supprimer une publication
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: "Publication non trouvée" });
        res.json({ message: "Publication supprimée avec succès." });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Récupérer les publications d'un lieu
exports.getPostsByPlace = async (req, res) => {
    try {
        const posts = await Post.find({ placeId: req.params.placeId }).populate('userId', 'username avatar');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

// 📌 Récupérer les publications d'un utilisateur
exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).populate('placeId', 'name category');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};
