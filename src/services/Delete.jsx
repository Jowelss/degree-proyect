import axios from 'axios';

export async function Delete(id, setItem, item, nombre) {
  try {
    await axios.delete(`http://localhost:5000/${nombre}/${id}`);
    setItem(item.filter((item) => item._id !== id));
  } catch (error) {
    console.log(`No se puedo eliminar el producto ${error}`);
  }
}
