import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// componentes
import { Formulario } from '../components/Formulario.jsx';
import { Panel } from '../components/Panel.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import { ItemCard } from '../components/ItemCard.jsx';
import { ModalDelete } from '../components/ModalDelete.jsx';
import { DataHeader } from '../components/DataHeader.jsx';
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
          }}
        >
          Agregar Libro
        </button>
      </HeaderPanel>

      <DataHeader>
        <li>Imagen</li>
        <li>Nombre</li>
        <li>Estado</li>
        <li>Precio</li>
        <li>Formato</li>
      </DataHeader>

      <ul className='flex flex-col gap-2 p-4'>
        {libros.map((libro) => (
          <ItemCard key={libro._id}>
            <img
              className='w-20px h-full'
              src={libro.imagen}
              alt='Imagen del producto'
            />
            <span>{libro.nombre}</span>
            <span>{libro.estado}</span>
            <span>{libro.precio}</span>
            <span>{libro.formato}</span>

            <div className='flex gap-1'>
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

      <Formulario classState={state}>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>Nuevo libro</span>
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
            <label>Inversión</label>
            <input type='number' {...register('precio')} />
          </div>

          <div>
            <label>Imagen</label>
            <input type='text' {...register('imagen')} />
          </div>

          <div>
            <label>¿De que trata?</label>
            <input type='text' {...register('sinopsis')} />
          </div>

          <div>
            <label>Estado</label>
            <input type='text' {...register('estado')} />
          </div>

          <div>
            <label>¿Como es este ejemplar?</label>
            <input type='text' {...register('formato')} />
          </div>

          <button
            onClick={handleClick}
            type='submit'
            className='block p-2 bg-blue-500 mt-2 cursor-pointer'
          >
            Agregar a tienda
          </button>
        </form>
      </Formulario>
    </Panel>
  );
}

export default Tienda;
