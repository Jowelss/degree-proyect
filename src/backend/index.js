import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import libro from './models/libro.js';
import evento from './models/evento.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
};

app.use(express.json());
app.use(cors(corsOptions));

mongoose
  .connect('mongodb://localhost:27017/autentica', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.log('Error de conexión a la base de datos', err));

// LIBROS
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
// END

// EVENTOS
app.post('/eventos', async (req, res) => {
  try {
    const nuevoEvento = new evento(req.body);
    await nuevoEvento.save();

    res.status(201).send('Evento agregado');
  } catch (error) {
    console.log(error);

    res.status(400).send('Error al guardar el super evento');
  }
});

app.get('/eventos', async (req, res) => {
  const eventos = await evento.find();
  res.json(eventos);
});
// END

// SERVIDOR
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
// END
