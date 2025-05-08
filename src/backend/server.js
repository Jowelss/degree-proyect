import express from 'express';
import mongoose from 'mongoose';
const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/Pruebas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error de conexión a la base de datos', err));

app.get('/', (req, res) => {
  res.send('Hola desde el servidor!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
