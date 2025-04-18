const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });
    
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Formato de token inválido' });

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado' });
        }
        return res.status(403).json({ message: 'Token inválido' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error('Error en autenticación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = authenticateToken;
