import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// componentes
import { Modal } from '../../components/Modal.jsx';
import { Panel } from '../../components/Panel.jsx';
import { HeaderPanel } from '../../components/HeaderPanel.jsx';
import { ItemCard } from '../../components/ItemCard.jsx';
import { ModalDelete } from '../../components/ModalDelete.jsx';
import { DataHeader } from '../../components/DataHeader.jsx';
import { DropImagen } from './components/DropImagen.jsx';
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
        <h1 className='text-4xl font-bold'>LIBROS</h1>
        <button
          className='bg-pink-400 text-white'
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
        <li>Estado</li>
        <li>Precio (bs)</li>
      </DataHeader>

      <ul className='flex flex-col-reverse'>
        {libros.map((libro, i) => (
          <ItemCard key={libro._id}>
            <div className='flex items-center gap-3'>
              <span className='mr-3'>{i}</span>

              <div className='w-14 h-full flex justify-center'>
                <img
                  className='object-contain h-full rounded-2xl'
                  src={libro.imagen}
                  alt='Imagen del producto'
                />
              </div>
              <span>{libro.nombre}</span>
            </div>

            <span>{libro.estado}</span>
            <span>{libro.precio}</span>

            <div>
              <button
                onClick={() => {
                  setSelectId(libro._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
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
        <div className='p-4 bg-white rounded-xl border border-gray-300'>
          <h2>¿Estas segura que quieres eliminar este producto?</h2>

          <div className='mt-2 flex justify-center gap-2'>
            <button
              className='bg-pink-400 text-white'
              onClick={() => {
                Delete(selectId, setLibros, libros, 'libros');
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
          <span className='text-4xl'>Producto</span>
          <button onClick={handleClick}>Cerrar</button>
        </div>

        <form onSubmit={onSubmit}>
          <div>
            <label>Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          <div>
            <label>Autor/a</label>
            <input type='text' {...register('autor')} />
          </div>

          <div className='flex justify-between flex-wrap items-center'>
            <div className='flex'>
              <label>Inversión</label>
              <input type='number' {...register('precio')} />
            </div>

            <div className='flex items-center'>
              <label>Género</label>

              <select className='border' type='text' {...register('genero')}>
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

            <div>
              <label>Cantidad</label>
              <input type='number' {...register('cantidad')} />
            </div>

            <div className='flex items-center gap-1.5 '>
              <label>¿Como es este ejemplar?</label>
              <select className='border' type='text' {...register('tapa')}>
                <option value=''>Seleccionar</option>

                <option value='Tapa dura'>Tapa dura</option>
                <option value='Tapa flexible'>Tapa flexible</option>
              </select>

              <select className='border' type='text' {...register('hoja')}>
                <option value=''>Seleccionar</option>

                <option value='Hoja ahuesada'>Hoja ahuesada</option>
                <option value='Hoja blanca'>Hoja blanca</option>
              </select>
            </div>
          </div>

          <div>
            <label>¿De que trata?</label>
            <textarea
              className='border w-full'
              type='text'
              rows={2}
              {...register('sinopsis')}
            />
          </div>

          <div>
            <label>Imagen</label>
            <input {...register('imagen')} hidden />
            <DropImagen setValue={setValue}>
              {imagenURL && (
                <img
                  src={imagenURL}
                  alt='Imagen'
                  className='object-contain h-full'
                />
              )}
            </DropImagen>
          </div>

          <button onClick={handleClick} type='submit'>
            {isNombre}
          </button>
        </form>
      </Modal>
    </Panel>
  );
}

export default Tienda;
