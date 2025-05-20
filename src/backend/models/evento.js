import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  ubication: String,
});

export default mongoose.model('Evento', eventoSchema);
