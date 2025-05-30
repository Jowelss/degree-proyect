import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ModalForm } from '../components/ModalForm';
import { Panel } from '../components/Panel';
import { HeaderPanel } from '../components/HeaderPanel';

function Reuniones() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <Panel className='w-[900px] border'>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Coaching</h1>
        <button onClick={handleClick}>Abrir Modal</button>
      </HeaderPanel>

      <ModalForm classState={state} onClosed={handleClick}>
        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>Descripción</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Lugar del evento</label>
            <input type='text' {...register('lugar')} />
          </div>

          <div>
            <label>Cantidad de integrantes</label>
            <input type='number' {...register('integrantes')} />
          </div>

          <button
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar a tienda
          </button>
        </form>
      </ModalForm>
    </Panel>
  );
}

export default Reuniones;
