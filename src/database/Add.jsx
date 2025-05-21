import axios from 'axios';

export async function Add(data, nombre) {
  try {
    await axios.post(`http://localhost:5000/${nombre}`, data);
  } catch (error) {
    console.log(error);
  }
}
