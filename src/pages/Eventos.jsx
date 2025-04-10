import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';

function Eventos() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  function handleClick() {
    setIsOpen(!isOpen);
  }

  // enviar datos del formulario
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  // end

  return (
    <section className='w-[900px] border'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={handleClick}>Abrir Modal</button>
      </div>

      <Formulario classState={state} onClosed={handleClick}>
        <h1 className='text-4xl font-bold text-gray-800'>Eventos</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul>
            <li>
              <label>Imagen del Evento</label>
              <input
                type='file'
                {...register('imagen', {
                  required: 'La imagen es obligatoria',
                })}
              />
            </li>

            <li>
              <label>Nombre del Evento</label>
              <input type='text' {...register('nombre')} />
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
            Agregar Evento
          </button>
        </form>
      </Formulario>
    </section>
  );
}

export default Eventos;
