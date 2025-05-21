import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  nombre: String,
  imagen: {
    type: String,
    required: true,
  },
  descripcion: String,
  ubicacion: String,
  hora: String,
});

export default mongoose.model('Evento', eventoSchema);
