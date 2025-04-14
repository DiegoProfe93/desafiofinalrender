const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticateToken, (req, res) => {
  try {
    res.json({ message: `Bienvenido, ${req.user.email}` });
  } catch (error) {
    console.error('Error al acceder al perfil:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;

