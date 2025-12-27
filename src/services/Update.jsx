import axios from 'axios';

export default function Update({ id, nombre, data, item, setValue, setOpen }) {
  const handleEdit = (post) => {
    Object.entries(post).forEach(([key, value]) => {
      if (key !== '_id') setValue(key, value);
    });
  };

  async function updateItem() {
    try {
      await axios.patch(`http://localhost:5000/${nombre}/${id}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <button
      className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
      onClick={() => {
        handleEdit(item);
        setOpen(true);
        updateItem();
      }}
    >
      Actualizar
    </button>
  );
}
