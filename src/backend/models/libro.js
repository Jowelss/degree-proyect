import mongoose from 'mongoose';

const libroSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  age: String,
});

export default mongoose.model('Libro', libroSchema);
