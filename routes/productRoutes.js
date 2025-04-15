const express = require('express');
const router = express.Router();
const { getAllProducts, getProductById, createProduct } = require('../controllers/productController');
const authenticateToken = require('../middlewares/auth');

router.get('/posts', getAllProducts);
router.get('/posts/:id', getProductById);
router.post('/posts', authenticateToken, createProduct);

module.exports = router;