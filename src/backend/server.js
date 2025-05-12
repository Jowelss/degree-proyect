import express from 'express';
import mongoose from 'mongoose';
import libro from './models/libro.js';

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/autentica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error de conexión a la base de datos', err));

app.post('/libros', async (req, res) => {
  try {
    const nuevoLibro = new libro(req.body);
    await nuevoLibro.save();

    res.status(201).send('Libro guardado');
  } catch (error) {
    res.status(400).send('Error al guardar el libro');

    console.log(error);
  }
});

app.get('/libros', async (req, res) => {
  const libros = await libro.find();
  res.json(libros);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
