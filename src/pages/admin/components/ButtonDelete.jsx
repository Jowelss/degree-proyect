import { useState } from 'react';
import { Delete } from '../../../services/Delete';

export default function ButtonDelete({ id, setPost, post, nombre }) {
  const [open, setOpen] = useState(false);

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
          <div className='border p-4 rounded-2xl bg-white'>
            <h2>¿Estas seguro que quieres eliminar este producto?</h2>

            <div className='mt-3 flex justify-center gap-2'>
              <button
                className='px-2 py-1 bg-pink-400 text-white rounded-2xl'
                onClick={() => {
                  Delete(id, setPost, post, nombre);
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
