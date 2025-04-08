import { useState } from 'react';
import { Formulario } from '../components/Formulario.jsx';

function Tienda() {
  // Metodo para abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';
  // end

  // Metodo para enviar formulario
  const [form, setForm] = useState({ nombre: '', author: '', pages: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado', form);
  };
  // end

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      </div>

      <Formulario classState={state} onClosed={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit}>
          <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

          <label>Nombre del libro</label>
          <input
            type='text'
            name='nombre'
            value={form.nombre}
            onChange={handleChange}
          />

          <label>Nombre del author</label>
          <input
            type='text'
            name='author'
            value={form.author}
            onChange={handleChange}
          />

          <label>Paginas</label>
          <input
            type='number'
            name='pages'
            value={form.pages}
            onChange={handleChange}
          />

          <button
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar a tienda
          </button>
        </form>
      </Formulario>
    </section>
  );
}

export default Tienda;
