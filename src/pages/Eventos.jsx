import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ModalForm } from '../components/ModalForm.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import { Panel } from '../components/Panel.jsx';
import { ItemCard } from '../components/ItemCard.jsx';
import { ModalDelete } from '../components/ModalDelete.jsx';
import { DataHeader } from '../components/DataHeader.jsx';
import { Fecha } from '../components/Fecha.jsx';
import { DropImagen } from '../components/DropImagen.jsx';

import { Add } from '../services/Add';
import { Get } from '../services/Get.jsx';
import { Delete } from '../services/Delete.jsx';
import { Update } from '../services/Update.jsx';

function Eventos() {
  // abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  //Cambio de nombre
  const [isnombre, setIsNombre] = useState('');

  const changeName = (nombre) => setIsNombre(nombre);
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
        <h1 className='text-4xl font-bold'>Eventos</h1>
        <button
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Nuevo Evento');
          }}
        >
          Agregar Evento
        </button>
      </HeaderPanel>

      <DataHeader>
        <li className='w-40'>Imagen</li>
        <li className='w-40'>Nombre</li>
        <li className='w-40'>Hora</li>
        <li className='w-40'>Fecha</li>
        <li className='w-40'>Ubicación</li>
        <li className='w-40'>Accion</li>
      </DataHeader>

      <ul className='flex flex-col gap-2 p-4'>
        {eventos.map((evento) => (
          <ItemCard key={evento._id}>
            <div className='flex justify-center w-40 h-full'>
              <img
                className='object-contain h-full'
                src={evento.imagen}
                alt='Imagen del evento'
              />
            </div>
            <span className='w-40'>{evento.nombre}</span>
            <span className='w-40'>{evento.hora}</span>
            <span className='w-40'>
              {new Date(evento.fecha).toLocaleDateString()}
            </span>
            <span className='w-40'>{evento.ubicacion}</span>

            <div className='flex justify-center w-40 gap-1'>
              <button
                className='w-18 rounded'
                onClick={() => {
                  setSelectId(evento._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
                className='w-18 rounded'
                onClick={() => {
                  handleClick();
                  handleEdit(evento);
                  changeName('Actualizar Evento');
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
                Delete(selectId, setEventos, eventos, 'eventos');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button onClick={handleClickDelete}>Cancelar</button>
          </div>
        </div>
      </ModalDelete>

      <ModalForm classState={state} onClosed={handleClick}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>{isnombre}</span>
          <button onClick={handleClick} className='p-1 rounded-xl'>
            Cerrar
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>Descripción</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Lugar del evento</label>
            <input type='text' {...register('ubicacion')} />
          </div>

          <div>
            <label>Fecha</label>
            <Fecha setValue={setValue} />
            <input type='text' {...register('fecha')} hidden />
          </div>

          <div>
            <label>Hora</label>
            <input aria-label='time' type='time' {...register('hora')} />
          </div>

          <div>
            <label>Imagen</label>
            <input {...register('imagen')} hidden />
            <DropImagen setValue={setValue}>
              {imagenURL && (
                <img
                  src={imagenURL}
                  alt='sexo'
                  className='object-contain h-full'
                />
              )}
            </DropImagen>
          </div>

          <button
            onClick={handleClick}
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar Evento
          </button>
        </form>
      </ModalForm>
    </Panel>
  );
}

export default Eventos;
