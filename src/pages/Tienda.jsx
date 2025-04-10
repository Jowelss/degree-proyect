import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';

function Tienda() {
  // Metodo para abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  function handleClick() {
    setIsOpen(!isOpen);
  }
  // end

  // enviar datos del formulario
  const { register, handleSubmit } = useForm();

  // Funcion con los datos recolectados
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });
  // end

  return (
    <section className='w-[900px] border relative'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={handleClick}>Abrir Modal</button>
      </div>

      <h1 className='text-4xl font-bold text-gray-800'>Tienda</h1>

      <Formulario classState={state} onClosed={handleClick}>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              <label>Nombre</label>
              <input type='text' {...register('nombre')} />
            </li>

            <li>
              <label>Imagen</label>
              <input type='file' {...register('imagen')} />
            </li>

            <li>
              <label>Precio</label>
              <input type='number' {...register('precio')} />
            </li>

            <li>
              <label>Descripción</label>
              <input type='text' {...register('descripcion')} />
            </li>

            <li>
              <label>Autor</label>
              <input type='text' {...register('autor')} />
            </li>

            <li>
              <label>Cantidad</label>
              <input type='number' {...register('cantidad')} />
            </li>

            <li>
              <label>Editorial</label>
              <input type='text' {...register('editorial')} />
            </li>

            <li>
              <label>Formato</label>
              <input type='text' {...register('formato')} />
            </li>
          </ul>

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
