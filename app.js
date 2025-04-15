const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(cors({
  origin: ['https://desafiofinalrender.onrender.com', 'https://pruebadesafio.netlify.app'],
  credentials: true
}));
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', uploadRoutes);

module.exports = app;
