import { useState } from 'react';
import { Modal } from '../Modal';

function Tienda() {
  const [isOpen, setIsOpen] = useState(false);

  const state = isOpen ? 'block' : 'hidden';

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      </div>

      <Modal classState={state} onClosed={() => setIsOpen(false)}>
        <form>
          <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

          <label>Imagen del libro</label>
          <input type='text' />

          <button className='block p-2 bg-blue-500 mt-2 cursor-pointer'>
            Agregar a tienda
          </button>
        </form>
      </Modal>
    </section>
  );
}

export default Tienda;
