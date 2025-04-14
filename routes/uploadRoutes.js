const express = require('express');
const router = express.Router();
const multer = require('multer');
const authenticateToken = require('../middlewares/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');},
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 
  }});

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
