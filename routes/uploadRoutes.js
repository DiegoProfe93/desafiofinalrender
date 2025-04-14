const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const authenticateToken = require('../middlewares/auth');

router.post('/upload', authenticateToken, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ningún archivo' });
    }
    res.status(200).json({ 
      message: 'Archivo subido exitosamente', 
      file: req.file.originalname 
    });
  } catch (error) {
    console.error('Error al subir archivo:', error);
    res.status(500).json({ message: 'Error al procesar el archivo' });
  }
});

module.exports = router;
