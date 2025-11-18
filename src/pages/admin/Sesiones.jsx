import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components/Modal.jsx';
import { Panel } from '../../components/Panel.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { Fecha } from '../../components/Fecha.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';

import { FaLink } from 'react-icons/fa';

import { Add } from '../../services/Add.jsx';
import { Get } from '../../services/Get.jsx';
import { Update } from '../../services/Update.jsx';
import { Delete } from '../../services/Delete.jsx';

function Reuniones() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);

  // Abre y cierra el modalButton
  const [openButtonDelete, setIsOpenButtonDelete] = useState(false);
  const stateButton = openButtonDelete ? 'block' : 'hidden';

  const handleClickDelete = () => setIsOpenButtonDelete(!openButtonDelete);
  // end

  //Cambio de nombre
  const [isnombre, setNombre] = useState('');
  // end

  const [sesion, setSesion] = useState([]);

  //Agregar a la db
  const fetchSesion = async () => {
    const data = await Get('sesion');

    if (data === undefined) {
      console.log('errorcito');
    } else {
      setSesion(data);
    }
  };

  useEffect(() => {
    fetchSesion();
  }, []);
  // end

  const [selectId, setSelectId] = useState(null);

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const fecha = watch('fecha');
  const imagenUrl = watch('imagen');

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      await Update(selectId, 'sesion', data);
    } else {
      await Add(data, 'sesion');
    }
    reset();

    fetchSesion();
  });
  // end

  //Actualizar producto
  const handleEdit = (evento) => {
    setSelectId(evento._id);

    Object.entries(evento).forEach(([key, value]) => {
      if (key !== '_id') setValue(key, value);
    });
  };
  // end

  return (
    <Panel className='w-[900px] border'>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>SESIONES</h1>
        <button
          className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            setNombre('Nueva sesion');
          }}
        >
          + Nueva Sesion
        </button>
      </HeaderPanel>

      <DataHeader>
        <li>Fecha</li>
        <li>Hora</li>
        <li>Vinculo</li>
      </DataHeader>

      <ul className='flex flex-col'>
        {sesion.map((item, i) => (
          <ItemCard key={item._id}>
            <div className='flex items-center gap-3'>
              <span className='mr-3'>{i}</span>

              <div className='w-14 h-full flex justify-center'>
                <img
                  className='object-contain h-full rounded-2xl'
                  src={item.imagen}
                  alt='Imagen del producto'
                />
              </div>
              <span>{item.titulo}</span>
            </div>
            <span>{new Date(item.fecha).toLocaleDateString()}</span>
            <span>{item.hora}</span>
            <a
              className='flex items-center gap-1.5 hover:text-pink-700'
              target='_blank'
              href={item.link}
            >
              <FaLink className='text-ms' />
              Link de la reunion
            </a>

            <div>
              <button
                onClick={() => {
                  setSelectId(item._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  handleClick();
                  handleEdit(item);
                  setNombre('Actualizar Sesion');
                }}
              >
                Actualizar
              </button>
            </div>
          </ItemCard>
        ))}
      </ul>

      <ModalDelete classState={stateButton}>
        <div className='border p-4 rounded-2xl'>
          <h2>¿Estas seguro que quieres eliminar este Evento?</h2>

          <div className='flex justify-center gap-2'>
            <button
              onClick={() => {
                Delete(selectId, setSesion, sesion, 'sesion');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button onClick={handleClickDelete}>Cancelar</button>
          </div>
        </div>
      </ModalDelete>

      <Modal classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>{isnombre}</span>
          <button onClick={handleClick}>Cerrar</button>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label>Titulo</label>
            <input type='text' {...register('titulo')} />
          </div>

          <div>
            <label>Vinculo de la reunion</label>
            <input type='text' {...register('link')} />
          </div>

          <div>
            <label>Fecha</label>
            <Fecha setValue={setValue} initialDate={fecha} />
            <input type='text' {...register('fecha')} hidden />
          </div>

          <div>
            <label>Hora</label>
            <input type='time' {...register('hora')} />
          </div>

          <div>
            <label>Descripción</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} hidden />
            <DropImagen setValue={setValue}>
              {imagenUrl && (
                <img
                  className='object-contain h-full'
                  src={imagenUrl}
                  alt='Imagen'
                />
              )}
            </DropImagen>
          </div>

          <button onClick={handleClick} type='submit'>
            Crear sesion
          </button>
        </form>
      </Modal>
    </Panel>
  );
}

export default Reuniones;
