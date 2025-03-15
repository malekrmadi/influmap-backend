const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Change avec une vraie clé sécurisée

// 🔹 Créer un utilisateur (Signup)
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, avatar, bio } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Cet email est déjà utilisé" });
        }

        const newUser = new User({ username, email, password, avatar, bio });
        await newUser.save();

        res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Authentification (Login)
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: "Connexion réussie", token, user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Modifier le profil (Update)
exports.updateUser = async (req, res) => {
    try {
        const { username, avatar, bio, level, badges } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { username, avatar, bio, level, badges },
            { new: true }
        );

        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json({ message: "Profil mis à jour", user });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Supprimer un compte (Delete)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json({ message: "Compte supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Récupérer les infos d’un utilisateur (Read)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// 🔹 Récupérer tous les utilisateurs (Read All)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

