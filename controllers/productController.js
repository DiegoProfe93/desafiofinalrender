const pool = require('../config/db');

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const userId = req.user.id;
    
    const result = await pool.query(
      'INSERT INTO products (title, description, price, image, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, price, image, userId]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { getAllProducts, getProductById, createProduct };