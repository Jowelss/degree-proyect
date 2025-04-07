import { useState } from 'react';
import { Modal } from '../Modal';

function Eventos() {
  const [isOpen, setIsOpen] = useState(false);

  const state = isOpen ? 'block' : 'hidden';

  return (
    <section className='w-[900px] border'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      </div>

      <Modal classState={state} onClosed={() => setIsOpen(false)}>
        <form>
          <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

          <label>Imagen del Evento</label>
          <input type='file' />

          <label>Nombre del Evento</label>
          <input type='text' />

          <label>Lugar del evento</label>
          <input type='text' />

          <label>Cantidad de integrantes</label>
          <input type='text' />

          <button className='block p-2 bg-blue-500 mt-2 cursor-pointer'>
            Agregar Evento
          </button>
        </form>
      </Modal>
    </section>
  );
}

export default Eventos;
