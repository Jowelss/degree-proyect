import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// componentes
import { ModalForm } from '../components/ModalForm.jsx';
import { Panel } from '../components/Panel.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import { ItemCard } from '../components/ItemCard.jsx';
import { ModalDelete } from '../components/ModalDelete.jsx';
import { DataHeader } from '../components/DataHeader.jsx';
import { DropImagen } from '../components/DropImagen.jsx';
// end

// Servicios API
import { Get } from '../services/Get.jsx';
import { Add } from '../services/Add.jsx';
import { Delete } from '../services/Delete.jsx';
import { Update } from '../services/Update.jsx';
// end

function Tienda() {
  // Abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  //Cambia el nombre del titulo del formModal segun la accion que quiera realizar ACTUALIZAR / AGREGAR
  const [isnombre, setIsNombre] = useState('');

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
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (selectId) {
      //Si los datos tienen un id los actualiza
      await Update(selectId, 'libros', data);
    } else {
      //Si no los tiene entonces es un producto nuevo
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
        <h1 className='text-4xl font-bold'>Productos</h1>
        <button
          className='p-1.5 rounded-xl'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Nuevo libro');
          }}
        >
          Agregar Libro
        </button>
      </HeaderPanel>

      <DataHeader>
        <li className='w-40 hover:bg-fuchsia-300'>Imagen</li>
        <li className='w-40'>Nombre</li>
        <li className='w-40'>Estado</li>
        <li className='w-40'>Precio (bs)</li>
        <li className='w-40'>Accion</li>
      </DataHeader>

      <ul className='flex flex-col gap-2 p-4'>
        {libros.map((libro) => (
          <ItemCard key={libro._id}>
            <div className='flex justify-center w-40 h-full'>
              <img
                className='object-contain h-full'
                src={libro.imagen}
                alt='Imagen del producto'
              />
            </div>
            <span className='w-40'>{libro.nombre}</span>
            <span className='w-40'>{libro.estado}</span>
            <span className='w-40'>{libro.precio}</span>

            <div className='flex justify-center w-40 gap-1'>
              <button
                className='w-18 rounded'
                onClick={() => {
                  setSelectId(libro._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button
                className='w-18 rounded'
                onClick={() => {
                  handleClick();
                  handleEdit(libro);
                  changeName('Actualizar libro');
                }}
              >
                Actualizar
              </button>
            </div>
          </ItemCard>
        ))}
      </ul>

      <DropImagen />

      <ModalDelete classState={stateButton}>
        <div className='border p-4 rounded-2xl bg-white'>
          <h2>¿Estas seguro que quieres eliminar este producto?</h2>

          <div className='flex justify-center gap-2'>
            <button
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

      <ModalForm classState={state}>
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
            <label>Autor/a</label>
            <input type='text' {...register('autor')} />
          </div>

          <div>
            <label>Género</label>
            <input type='text' {...register('genero')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>¿De que trata?</label>
            <textarea
              className='border'
              type='text'
              rows={2}
              cols={100}
              {...register('sinopsis')}
            />
          </div>

          <div className='flex justify-between'>
            <div className='flex'>
              <label>Inversión</label>
              <input type='number' {...register('precio')} />
            </div>

            <div className='flex gap-1'>
              <label>Estado</label>
              <select className='border' type='text' {...register('estado')}>
                <option value='Disponible'>Disponible</option>
                <option value='Agotado'>Agotado</option>
              </select>
            </div>

            <div className='flex gap-1.5 '>
              <label>¿Como es este ejemplar?</label>
              <select className='border' type='text' {...register('tapa')}>
                <option value='Tapa dura'>Tapa dura</option>
                <option value='Tapa flexible'>Tapa flexible</option>
              </select>

              <select className='border' type='text' {...register('hoja')}>
                <option value='Hoja ahuesada'>Hoja ahuesada</option>
                <option value='Hoja blanca'>Hoja blanca</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleClick}
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

export default Tienda;
