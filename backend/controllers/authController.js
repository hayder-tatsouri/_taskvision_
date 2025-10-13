const bcrypt = require('bcrypt');
const { user} = require('../models');
const jwt=require('jsonwebtoken');


const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' } 
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' } 
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await user.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(404).json({ message: "Email ou Mot de passe incorrect." });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email ou Mot de passe incorrect." });
    }
    const token = generateAccessToken(foundUser);
    const refreshToken = generateRefreshToken(foundUser);
    const userData = foundUser.toJSON();
    delete userData.password;

    res.status(200).json({ message: "Connexion réussie", token, refreshToken, user: userData });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
const refreshToken = (req, res) => {
  const { reftoken } = req.body;
  if (!reftoken) {
    return res.status(401).json({ message: 'Token manquant' });
  }

  jwt.verify(reftoken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalide' });
    }
    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });
    res.status(200).json({ token: newAccessToken });
  });
};


module.exports = {
    login,
    refreshToken
    };