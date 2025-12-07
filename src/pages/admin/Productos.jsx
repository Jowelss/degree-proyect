import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { IoClose, IoRemove, IoAdd } from 'react-icons/io5';

// componentes
import { Modal } from '../../components/Modal.jsx';
import { Panel } from '../../components/Panel.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { DropImagen } from './components/DropImagen.jsx';
import { TitlePanel } from './components/TitlePanel.jsx';
// end

// Servicios API
import { Get } from '../../services/Get.jsx';
import { Add } from '../../services/Add.jsx';
import { Delete } from '../../services/Delete.jsx';
import { Update } from '../../services/Update.jsx';
// end

function Tienda() {
  // Abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  //Cambia el nombre del titulo del formModal segun la accion que quiera realizar ACTUALIZAR / AGREGAR
  const [isNombre, setIsNombre] = useState('');

  const changeName = (nombre) => setIsNombre(nombre);
  // end

  // Agregar libro a la UI
  const [libros, setLibros] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('libros');

    if (data === undefined) {
      console.log('No funca pa');
    } else {
      setLibros(data);
    }
  };

  useEffect(() => {
    // El use effect hace que lo que este dentro se cargue una sola ves a iniciar el sistema web
    fetchLibros();
  }, []);
  // end

  // Almacena el ID del producto y esta se la pasa como parametro a la funcion 'eliminarProducto'
  const [selectId, setSelectId] = useState(null);
  // end

  // Abre y cierra el modalButton
  const [openButtonDelete, setIsOpenButtonDelete] = useState(false);
  const stateButton = openButtonDelete ? 'block' : 'hidden';

  const handleClickDelete = () => setIsOpenButtonDelete(!openButtonDelete);
  // end

  // Enviar datos del formulario
  const { register, handleSubmit, reset, setValue, watch } = useForm();

  const imagenURL = watch('imagen'); // URL de la imagen creada en cloudinary

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      //Si los datos tienen un id los actualiza
      if (data.cantidad > 0) {
        data.estado = 'Disponible';
      } else {
        data.estado = 'Agotado';
      }

      await Update(selectId, 'libros', data);
    } else {
      //Si no los tiene entonces es un producto nuevo

      if (data.cantidad > 0) {
        data.estado = 'Disponible';
      } else {
        data.estado = 'Agotado';
      }

      await Add(data, 'libros');
    }

    reset();

    fetchLibros();
  });
  // end

  // Actualizar un producto
  const handleEdit = (producto) => {
    setSelectId(producto._id);

    Object.entries(producto).forEach(([key, value]) => {
      if (key !== '_id') setValue(key, value);
    });
  };
  // end

  return (
    <Panel>
      <HeaderPanel>
        <TitlePanel title={'LIBROS'} />

        <button
          className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Agregar');
          }}
        >
          + Nuevo Libro
        </button>
      </HeaderPanel>

      <DataHeader>
        <li className='text-center'>Estado</li>
        <li className='text-center'>Precio (bs)</li>
        <li className='text-center'>Cantidad</li>
      </DataHeader>

      <ul className='flex flex-col-reverse'>
        {libros.map((libro, i) => (
          <ItemCard key={libro._id}>
            <div className='flex items-center gap-2 col-span-2'>
              <span className='min-w-7 text-center'>{i}</span>

              <div className='min-w-14 h-14 bg-pink-400 rounded-2xl overflow-hidden'>
                <img
                  className='object-contain w-full h-full'
                  src={libro.imagen}
                  alt='Imagen del producto'
                />
              </div>

              <span className='whitespace-nowrap overflow-hidden'>
                {libro.nombre}
              </span>
            </div>

            <span className='text-center'>{libro.estado}</span>
            <span className='text-center'>{libro.precio}</span>
            <span className='text-center'>{libro.cantidad}</span>

            <div className='flex justify-center gap-2 col-span-2'>
              <button
                className='py-1 px-2 rounded-2xl bg-gray-200'
                onClick={() => {
                  setSelectId(libro._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
                className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
                onClick={() => {
                  handleClick();
                  handleEdit(libro);
                  changeName('Actualizar');
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
          <h2>¿Estas segura que quieres eliminar este libro?</h2>

          <div className='mt-2 flex justify-center gap-2'>
            <button
              className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
              onClick={() => {
                Delete(selectId, setLibros, libros, 'libros');
                handleClickDelete();
              }}
            >
              Confirmar
            </button>
            <button
              className='py-1 px-2 rounded-2xl bg-gray-300'
              onClick={handleClickDelete}
            >
              Cancelar
            </button>
          </div>
        </div>
      </ModalDelete>

      <Modal classState={state}>
        <div className='w-[850px] text-black/90'>
          <div className='flex justify-between items-center mb-3'>
            <span className='text-4xl'>Nuevo Libro</span>

            <button onClick={handleClick}>
              <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
            </button>
          </div>

          <form onSubmit={onSubmit}>
            <div className='flex gap-4 justify-between'>
              <div className='w-140'>
                <div className='flex gap-2 justify-between'>
                  <div className='flex-1'>
                    <label className='pl-2'>Nombre</label>
                    <input
                      className='coso'
                      type='text'
                      {...register('nombre')}
                    />
                  </div>

                  <div className='flex-1'>
                    <label className='pl-2'>Autor/a</label>
                    <input
                      className='coso'
                      type='text'
                      {...register('autor')}
                    />
                  </div>
                </div>

                <div className='col-span-2 mt-3'>
                  <label>¿De que trata?</label>
                  <textarea
                    className='coso w-full h-20 resize-none'
                    type='text'
                    rows={2}
                    {...register('sinopsis')}
                  />
                </div>

                <div className='mt-3 flex gap-2'>
                  <div className='w-30'>
                    <label className='pl-2'>Inversión</label>
                    <input
                      className='coso text-center'
                      type='number'
                      {...register('precio')}
                    />
                  </div>

                  <div className='w-30'>
                    <label className='pl-2'>Stock</label>
                    <input
                      className='coso text-center'
                      type='number'
                      {...register('cantidad')}
                    />
                  </div>

                  <div>
                    <label>¿Como es este ejemplar?</label>

                    <div className='flex gap-2'>
                      <select
                        className='coso'
                        type='text'
                        {...register('tapa')}
                      >
                        <option value=''>Seleccionar</option>

                        <option value='Tapa dura'>Tapa dura</option>
                        <option value='Tapa flexible'>Tapa flexible</option>
                      </select>

                      <select
                        className='coso'
                        type='text'
                        {...register('hoja')}
                      >
                        <option value=''>Seleccionar</option>

                        <option value='Hoja ahuesada'>Hoja ahuesada</option>
                        <option value='Hoja blanca'>Hoja blanca</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className='mt-3'>
                  <label className='pl-2'>Género</label>

                  <select className='coso' type='text' {...register('genero')}>
                    <option value=''>Seleccionar</option>

                    <option value='Crecimiento personal'>
                      Crecimiento personal
                    </option>
                    <option value='Crecimiento profesional'>
                      Crecimiento profesional
                    </option>
                    <option value='Espiritualidad y bienestar'>
                      Espiritualidad y bienestar
                    </option>
                    <option value='Salud y bienestar'>Salud y bienestar</option>
                    <option value='Amor y relaciones'>Amor y relaciones</option>
                    <option value='Educación y aprendizaje'>
                      Educación y aprendizaje
                    </option>
                    <option value='Novelas'>Novelas</option>
                    <option value='Ficcion'>Ficción</option>
                    <option value='Infantiles'>Infantiles</option>
                    <option value='Adolescentes / Jovenes'>
                      Adolescentes / Jóvenes
                    </option>
                    <option value='Familia y crianza'>Familia y crianza</option>
                    <option>Otro</option>
                  </select>
                </div>

                <button
                  className='py-1 px-2 mt-3 rounded-2xl text-white bg-pink-400'
                  onClick={handleClick}
                  type='submit'
                >
                  {isNombre}
                </button>
              </div>

              <div>
                <label className='pl-2'>Imagen</label>

                <input {...register('imagen')} hidden />
                <div className='w-70 h-90'>
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
          </form>
        </div>
      </Modal>
    </Panel>
  );
}

export default Tienda;
