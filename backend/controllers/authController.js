const bcrypt = require('bcrypt');
const { user} = require('../models');
const jwt=require('jsonwebtoken');




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
    const token= jwt.sign(
      { id: foundUser.id, role: foundUser.role },
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '1h' }
    );
    const userData = foundUser.toJSON();
    delete userData.password;

    res.status(200).json({ message: "Connexion réussie", token, user: userData });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


module.exports = {
    login
    };