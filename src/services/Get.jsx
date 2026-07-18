import axios from 'axios';

export async function Get(db) {
  try {
    const response = await axios.get(`http://localhost:5000/${db}`);

    return response.data;
  } catch (error) {
    console.error(`Error al obtener ${db}:`, error);
    throw error;
  }
}
