const jwt = require('jsonwebtoken');

verifyToken = (req, res, next) => {
    let token;
    if (req.headers['authorization'] && req.headers['authorization'].startsWith('Bearer ')) {
    token = req.headers['authorization'].split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Token manquant ou invalide' });
    }
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = user; 
    next();
  });
};
module.exports = {
  verifyToken
};