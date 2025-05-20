import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';
import axios from 'axios';

function Tienda() {
  // Metodo para abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  // enviar datos del formulario
  const { register, handleSubmit, reset } = useForm();

  // Funcion con los datos recolectados
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('http://localhost:5000/libros', data);

      alert('Libro Agregado');
    } catch (error) {
      console.log(error);
    }
    reset();
  });
  // end

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={handleClick}>Abrir Modal</button>
      </div>

      <h1 className='text-4xl font-bold text-gray-800'>Productos</h1>

      <Formulario classState={state} onClosed={handleClick}>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input {...register('name')} />
          </div>

          <div>
            <label>Apellido</label>
            <input {...register('lastName')} />
          </div>

          <div>
            <label>Precio</label>
            <input {...register('age')} />
          </div>

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
