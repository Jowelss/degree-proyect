import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario';

function Reuniones() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  function handleClick() {
    setIsOpen(!isOpen);
  }

  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className='w-[900px] border'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={handleClick}>Abrir Modal</button>
      </div>

      <h1 className='text-4xl font-bold text-gray-800'>Reuniones</h1>

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
              <label>Descripción</label>
              <input type='text' {...register('descripcion')} />
            </li>

            <li>
              <label>Lugar del evento</label>
              <input type='text' {...register('lugar')} />
            </li>

            <li>
              <label>Cantidad de integrantes</label>
              <input type='text' {...register('integrantes')} />
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

export default Reuniones;
