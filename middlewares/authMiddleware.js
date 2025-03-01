const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Accès non autorisé" });

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide" });
    }
};
