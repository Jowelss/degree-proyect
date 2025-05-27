import axios from 'axios';

export async function Update(id, nombre, data) {
  try {
    await axios.patch(`http://localhost:5000/${nombre}/${id}`, data);
  } catch (error) {
    console.log(error);
  }
}
