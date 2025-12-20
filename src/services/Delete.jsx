import axios from 'axios';
import { useState } from 'react';

export default function Delete({ id, setItem, item, name, children }) {
  const [open, setOpen] = useState(false);

  async function deleteItem() {
    try {
      await axios.delete(`http://localhost:5000/${name}/${id}`);
      await setItem(item.filter((item) => item._id !== id));
    } catch (error) {
      console.log(`No se puedo eliminar el producto ${error}`);
    }
  }

  return (
    <>
      <button
        className='px-2 py-1 bg-gray-100 rounded-2xl'
        onClick={() => {
          setOpen(true);
        }}
      >
        Eliminar
      </button>

      {open && (
        <div
          className={`fixed inset-0 flex justify-center items-center bg-[#00000091]`}
        >
          <div className='p-4 rounded-2xl bg-white'>
            {children}

            <div className='mt-3 flex justify-center gap-2'>
              <button
                className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
                onClick={() => {
                  deleteItem();
                  setOpen(false);
                }}
              >
                Confirmar
              </button>
              <button
                className='px-2 py-1 bg-gray-100 rounded-2xl'
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
