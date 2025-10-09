import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '../../components/Modal.jsx';
import { Panel } from '../../components/Panel.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';

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
        <h1 className='text-4xl font-bold'>SESIONES</h1>
        <button className='bg-pink-400 text-white' onClick={handleClick}>
          + Nueva Sesion
        </button>
      </HeaderPanel>

      <DataHeader>
        <li>Integrantes</li>
      </DataHeader>

      <Modal classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>Sesion nueva</span>
          <button onClick={handleClick}>Cerrar</button>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label>Titulo</label>
            <input type='text' {...register('titulo')} />
          </div>

          <div>
            <label>Cantidad de integrantes</label>
            <input type='number' {...register('integrantes')} />
          </div>

          <div>
            <label>Vinculo de la reunion</label>
            <input type='text' {...register('link')} />
          </div>

          <div>
            <label>Fecha</label>
            <input type='text' {...register('fecha')} hidden />
          </div>

          <div>
            <label>Descripción</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <button
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Crear sesion
          </button>
        </form>
      </Modal>
    </Panel>
  );
}

export default Reuniones;
