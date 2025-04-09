import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formulario } from '../components/Formulario.jsx';

function Eventos() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  // enviar datos del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  // end

  return (
    <section className='w-[900px] border'>
      <div className='flex justify-end items-center bg-gray-800 text-white p-4 mb-4'>
        <button onClick={() => setIsOpen(true)}>Abrir Modal</button>
      </div>

      <Formulario classState={state} onClosed={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-4xl font-bold text-gray-800'>Eventos</h1>

          <label>Imagen del Evento</label>
          <input
            type='file'
            {...register('imagen', { required: 'La imagen es obligatoria' })}
          />
          {errors.imagen && <p>{errors.Imagen.message}</p>}

          <label>Nombre del Evento</label>
          <input
            type='text'
            {...register('nombre', { required: 'El nombre es obligatorio' })}
          />
          {errors.nombre && <p>{errors.nombre.message}</p>}

          <label>Lugar del evento</label>
          <input type='text' />

          <label>Cantidad de integrantes</label>
          <input type='text' />

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
