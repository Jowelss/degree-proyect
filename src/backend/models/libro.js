import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  nombre: String,
  autor: String,
  editorial: String,
  imagen: {
    type: String,
    required: true,
  },
  descripcion: String,
  precio: Number,
});

export default mongoose.model('Libro', libroSchema);
