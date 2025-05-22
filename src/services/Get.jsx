import axios from 'axios';

export async function Get(db) {
  const response = await axios.get(`http://localhost:5000/${db}`);
  return response.data;
}
