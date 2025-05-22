import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';
import { Add } from '../services/Add';

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
    <section className='w-[900px] h-[500px] border rounded-2xl overflow-hidden'>
      <div className='flex justify-between items-center bg-gray-800 text-white p-4'>
        <h1 className='text-4xl font-bold'>Productos</h1>
        <button onClick={handleClick}>Agregar Libro</button>
      </div>

      <ul className='flex justify-around mb-1 mt-1'>
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
            <label>Autor/a</label>
            <input type='text' {...register('autor')} />
          </div>

          <div>
            <label>Género</label>
            <input type='text' {...register('genero')} />
          </div>

          <div>
            <label>Inversión</label>
            <input type='number' {...register('precio')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>¿De que trata?</label>
            <input type='text' {...register('sinopsis')} />
          </div>

          <div>
            <label>Estado</label>
            <input type='text' {...register('estado')} />
          </div>

          <div>
            <label>¿Como es este ejemplar?</label>
            <input type='text' {...register('formato')} />
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
