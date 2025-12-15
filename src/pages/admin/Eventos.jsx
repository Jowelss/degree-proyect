import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { IoClose, IoRemove, IoAdd } from 'react-icons/io5';

import { Modal } from '../../components/Modal.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { Panel } from '../../components/Panel.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { Fecha } from '../../components/Fecha.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { TitlePanel } from './components/TitlePanel.jsx';

import { Add } from '../../services/Add.jsx';
import { Get } from '../../services/Get.jsx';
import Delete from '../../services/Delete.jsx';
import { Update } from '../../services/Update.jsx';

function Eventos() {
  // abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  //Cambio de nombre
  const [isnombre, setIsNombre] = useState('');

  // end

  // Agregar Evento a la UI
  const [eventos, setEventos] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('eventos');

    if (data === undefined) {
      console.log('Error pa');
    } else {
      setEventos(data);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);
  // end

  // Almacena el ID del evento y esta se la pasa como parametro a la funcion 'eliminarProducto'
  const [selectId, setSelectId] = useState(null);
  // end

  // Abre y cierra el modalButton
  const [openButtonDelete, setIsOpenButtonDelete] = useState(false);
  const stateButton = openButtonDelete ? 'block' : 'hidden';

  const handleClickDelete = () => setIsOpenButtonDelete(!openButtonDelete);
  // end

  // enviar datos del formulario
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const imagenURL = watch('imagen');
  const fechaEvent = watch('fecha');

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      await Update(selectId, 'eventos', data);
    } else {
      await Add(data, 'eventos');
    }
    reset();

    fetchLibros();
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
    <Panel>
      <HeaderPanel>
        <TitlePanel title={'EVENTOS'} />

        <button
          className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            setIsNombre('Nuevo evento');
          }}
        >
          + Nuevo Evento
        </button>
      </HeaderPanel>

      <DataHeader>
        <li>Hora</li>
        <li>Fecha</li>
        <li>Ubicación</li>
      </DataHeader>

      <ul className='flex flex-col'>
        {eventos.map((evento, i) => (
          <ItemCard key={evento._id}>
            <div className='flex gap-2 items-center col-span-2'>
              <span className='min-w-7 text-center'>{i}</span>

              <div className='min-w-14 h-14 bg-pink-400 rounded-2xl overflow-hidden'>
                <img
                  className='object-contain w-full h-full'
                  src={evento.imagen}
                  alt='Imagen del producto'
                />
              </div>

              <span className='whitespace-nowrap overflow-hidden'>
                {evento.nombre}
              </span>
            </div>

            <span>{evento.hora}</span>
            <span>{new Date(evento.fecha).toLocaleDateString()}</span>
            <span className='whitespace-nowrap overflow-hidden'>
              {evento.ubicacion}
            </span>

            <div className='flex justify-center gap-2 col-span-2'>
              <Delete
                id={evento._id}
                setItem={setEventos}
                item={eventos}
                name={'eventos'}
              >
                <h2>
                  ¿ Estas seguro que quieres eliminar este{' '}
                  <b className='text-pink-400'>EVENTO</b> ?
                </h2>
              </Delete>

              <button
                className='py-1 px-2 bg-pink-400 text-white rounded-2xl'
                onClick={() => {
                  handleClick();
                  handleEdit(evento);
                  setIsNombre('Actualizar evento');
                }}
              >
                Actualizar
              </button>
            </div>
          </ItemCard>
        ))}
      </ul>

      <ModalDelete classState={stateButton}>
        <div className='p-4 bg-white rounded-2xl'>
          <h2>¿Estas seguro que quieres eliminar este Evento?</h2>

          <div className='mt-2 flex justify-center gap-2'>
            <button
              className='py-1 px-2 bg-pink-400 text-white rounded-2xl'
              onClick={() => {
                Delete(selectId, setEventos, eventos, 'eventos');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button
              className='py-1 px-2 bg-gray-200 rounded-2xl'
              onClick={handleClickDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ModalDelete>

      <Modal classState={state}>
        <div className='w-240'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-4xl'>{isnombre}</span>
            <button onClick={handleClick}>
              <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className='flex gap-4'>
              <div className='max-w-120'>
                <div className='flex justify-between gap-2'>
                  <div>
                    <label>Nombre</label>
                    <input
                      className='coso '
                      type='text'
                      {...register('nombre')}
                    />
                  </div>

                  <div>
                    <label>Lugar del evento</label>
                    <input
                      className='coso'
                      type='text'
                      {...register('ubicacion')}
                    />
                  </div>
                </div>

                <div className='mt-3'>
                  <label>¿Que viviremos?</label>
                  <input
                    className='coso'
                    type='text'
                    {...register('descripcion')}
                  />
                </div>

                <div className='flex justify-around mt-3'>
                  <div>
                    <label>Fecha</label>
                    <Fecha setValue={setValue} initialDate={fechaEvent} />
                    <input type='text' {...register('fecha')} hidden />
                  </div>

                  <div>
                    <label className='text-center'>Hora</label>
                    <input className='coso' type='time' {...register('hora')} />
                  </div>

                  <div className='w-20'>
                    <label className='text-center'>Cupos</label>
                    <input
                      className='coso text-center'
                      type='number'
                      {...register('cupos')}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label>Imagen</label>
                <input {...register('imagen')} hidden />
                <div className='w-120 h-50'>
                  <DropImagen setValue={setValue}>
                    {imagenURL && (
                      <img
                        src={imagenURL}
                        alt='Imagen del evento'
                        className='object-contain h-full w-full'
                      />
                    )}
                  </DropImagen>
                </div>
              </div>
            </div>

            <button
              className='py-1 px-2 bg-pink-400 rounded-2xl text-white'
              onClick={handleClick}
              type='submit'
            >
              Agregar Evento
            </button>
          </form>
        </div>
      </Modal>
    </Panel>
  );
}

export default Eventos;
