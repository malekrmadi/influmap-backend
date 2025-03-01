const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true }, // UUID
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "" }, // URL image
    bio: { type: String, default: "" }, // Optionnel
    level: { type: Number, default: 1 }, // Basé sur l'activité
    badges: { type: [String], default: [] }, // Tableau des badges
}, { timestamps: true }); // Ajoute createdAt & updatedAt

// Hash du mot de passe avant l'enregistrement
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('User', UserSchema);
