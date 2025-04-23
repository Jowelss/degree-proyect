import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function Add(data, name) {
  try {
    await addDoc(collection(db, name), {
      data,
    });
  } catch (error) {
    // TENGO QUE MANEJAR LOS ERRORES
    console.log(error);
  }
}
