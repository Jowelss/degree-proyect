import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Modal } from '../../components/Modal.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { Panel } from '../../components/Panel.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { Fecha } from '../../components/Fecha.jsx';
import { DropImagen } from './components/DropImagen.jsx';

import { Add } from '../../services/Add.jsx';
import { Get } from '../../services/Get.jsx';
import { Delete } from '../../services/Delete.jsx';
import { Update } from '../../services/Update.jsx';

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
        <h1 className='text-4xl font-bold'>EVENTOS</h1>
        <button
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Nuevo Evento');
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
            <div className='flex items-center gap-3'>
              <span className='mr-3'>{i}</span>

              <div className='w-14 h-full flex justify-center'>
                <img
                  className='object-contain h-full rounded-2xl'
                  src={evento.imagen}
                  alt='Imagen del producto'
                />
              </div>
              <span>{evento.nombre}</span>
            </div>
            <span>{evento.hora}</span>
            <span>{new Date(evento.fecha).toLocaleDateString()}</span>
            <span>{evento.ubicacion}</span>

            <div>
              <button
                onClick={() => {
                  setSelectId(evento._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
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

      <Modal classState={state}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>{isnombre}</span>
          <button onClick={handleClick}>Cerrar</button>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>¿Que viviremos?</label>
            <input type='text' {...register('descripcion')} />
          </div>

          <div>
            <label>Lugar del evento</label>
            <input type='text' {...register('ubicacion')} />
          </div>

          <div>
            <label>Fecha</label>
            <Fecha setValue={setValue} initialDate={fechaEvent} />
            <input type='text' {...register('fecha')} hidden />
          </div>

          <div>
            <label>Hora</label>
            <input aria-label='time' type='time' {...register('hora')} />
          </div>

          <div>
            <label>Cupos</label>
            <input type='number' {...register('cupos')} />
          </div>

          <div>
            <label>Imagen</label>
            <input {...register('imagen')} hidden />
            <DropImagen setValue={setValue}>
              {imagenURL && (
                <img
                  src={imagenURL}
                  alt='Imagen del evento'
                  className='object-contain h-full'
                />
              )}
            </DropImagen>
          </div>

          <button onClick={handleClick} type='submit' className='mt-2'>
            Agregar Evento
          </button>
        </form>
      </Modal>
    </Panel>
  );
}

export default Eventos;
