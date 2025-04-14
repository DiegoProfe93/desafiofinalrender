const app = require('./app');
const PORT = process.env.PORT || 3000;

try {
  app.listen(PORT, () => {
    console.log(`Servidor andando en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Error al iniciar el servidor:', error);
  process.exit(1);
}