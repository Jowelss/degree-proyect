import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { IoClose, IoRemove, IoAdd } from 'react-icons/io5';

import { Modal } from '../../components/Modal.jsx';
import { Panel } from '../../components/Panel.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { Fecha } from '../../components/Fecha.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { TitlePanel } from './components/TitlePanel.jsx';

import { FaLink } from 'react-icons/fa';

import { Add } from '../../services/Add.jsx';
import { Get } from '../../services/Get.jsx';
import Update from '../../services/Update.jsx';
import Delete from '../../services/Delete.jsx';

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
        <TitlePanel title={'SESIONES'} />

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
        <li className='text-center'>Fecha</li>
        <li className='text-center'>Hora</li>
        <li className='text-center col-span-2'>Vinculo</li>
      </DataHeader>

      <ul className='flex flex-col'>
        {sesion.map((item, i) => (
          <ItemCard key={item._id}>
            <div className='flex items-center gap-2 col-span-2'>
              <span className='min-w-7 text-center'>{i}</span>

              <div className='min-w-14 h-14 bg-pink-400 rounded-2xl overflow-hidden'>
                <img
                  className='object-contain w-full h-full'
                  src={item.imagen}
                  alt='Imagen del producto'
                />
              </div>

              <span className='whitespace-nowrap overflow-hidden'>
                {item.titulo}
              </span>
            </div>
            <span className='text-center'>{item.hora}</span>

            <span className='text-center'>
              {new Date(item.fecha).toLocaleDateString()}
            </span>

            <div className='w-full flex justify-center col-span-2'>
              <a
                className='flex items-center justify-center gap-1.5 hover:text-pink-700 whitespace-nowrap overflow-hidden'
                target='_blank'
                href={item.link}
              >
                <FaLink className='text-ms' />
                Link de la reunion
              </a>
            </div>

            <div className='flex gap-2 justify-center col-span-2'>
              <Delete
                id={item._id}
                setItem={setSesion}
                item={sesion}
                name={'sesion'}
              >
                <h2>
                  ¿ Estas seguro que quieres eliminar esta{' '}
                  <b className='text-pink-400'>REUNIÓN</b> ?
                </h2>
              </Delete>

              <button
                className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
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
        <div className='border p-4 rounded-2xl bg-white'>
          <h2>¿Estas seguro que quieres eliminar esta sesion?</h2>

          <div className='mt-2 flex justify-center gap-2'>
            <button
              className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
              onClick={() => {
                Delete(selectId, setSesion, sesion, 'sesion');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button
              className='py-1 px-2 rounded-2xl bg-gray-200'
              onClick={handleClickDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ModalDelete>

      <Modal classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>{isnombre}</span>

          <button onClick={handleClick}>
            <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className='w-200 flex gap-3'>
            <div className='min-w-100'>
              <div>
                <label className='pl-2'>Titulo</label>
                <input className='coso' type='text' {...register('titulo')} />
              </div>

              <div className='mt-3'>
                <label className='pl-2'>Vinculo de la reunion</label>
                <input className='coso' type='text' {...register('link')} />
              </div>

              <div className='mt-3'>
                <label className='pl-2'>Descripción</label>
                <textarea
                  className='coso w-full'
                  type='text'
                  rows={5}
                  {...register('descripcion')}
                />
              </div>

              <div className='mt-3 flex gap-2'>
                <div>
                  <label className='pl-2'>Fecha</label>
                  <Fecha setValue={setValue} initialDate={fecha} />
                  <input type='text' {...register('fecha')} hidden />
                </div>

                <div>
                  <label className='pl-2'>Hora</label>
                  <input className='coso' type='time' {...register('hora')} />
                </div>
              </div>

              <button
                className='px-2 py-1 bg-pink-400 text-white rounded-2xl mt-3'
                onClick={handleClick}
                type='submit'
              >
                Crear sesion
              </button>
            </div>

            <div className='w-full'>
              <label className='pl-2'>Imagen</label>

              <input {...register('imagen')} hidden />

              <div className='w-full h-80'>
                <DropImagen setValue={setValue}>
                  {imagenUrl && (
                    <img
                      src={imagenUrl}
                      alt='Imagen del evento'
                      className='object-contain h-full w-full'
                    />
                  )}
                </DropImagen>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </Panel>
  );
}

export default Reuniones;
