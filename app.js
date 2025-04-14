const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', uploadRoutes);

module.exports = app;
