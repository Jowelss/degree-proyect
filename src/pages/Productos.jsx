import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';
import { Add } from '../database/Add';

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
    await Add(data, 'libros');
    reset();
  });
  // end

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={handleClick}>Agregar Libro</button>
      </div>

      <h1 className='text-4xl font-bold text-gray-800'>Productos</h1>

      <ul className='flex justify-around'>
        <li>Producto</li>
        <li>Estado</li>
        <li>Precio</li>
        <li>Cantidad</li>
      </ul>

      <Formulario classState={state} onClosed={handleClick}>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>Autor</label>
            <input type='text' {...register('autor')} />
          </div>

          <div>
            <label>Género</label>
            <input type='text' {...register('genero')} />
          </div>

          <div>
            <label>Precio</label>
            <input type='number' {...register('precio')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>Sinopsis</label>
            <input type='text' {...register('sinopsis')} />
          </div>

          <div>
            <label>Cantidad</label>
            <input type='number' {...register('cantidad')} />
          </div>

          <div>
            <label>Estado</label>
            <input type='text' {...register('estado')} />
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
