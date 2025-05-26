import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// componentes
import { Formulario } from '../components/Formulario.jsx';
import { Panel } from '../components/Panel.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import { ItemCard } from '../components/ItemCard.jsx';
import { ModalDelete } from '../components/ModalDelete.jsx';
// end

// Servicios API
import { Get } from '../services/Get.jsx';
import { Add } from '../services/Add.jsx';
// end

function Tienda() {
  // Metodo para abrir y cerrar el modal
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);
  // end

  // Agregar libro al panel
  const [libros, setLibros] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('libros');

    setLibros(data);
  };

  useEffect(() => {
    // El use effect hace que lo que este dentro se cargue una sola ves a iniciar el sistema web
    fetchLibros();
  }, []);
  // end

  // Almacena el ID del producto y esta se la pasa como parametro a la funcion 'eliminarProdcuto'
  const [selectId, setSelectId] = useState(null);

  const [openButtonDelete, setIsOpenButtonDelete] = useState(false);
  const stateButton = openButtonDelete ? 'block' : 'hidden';

  const handleClickDelete = () => setIsOpenButtonDelete(!openButtonDelete);

  // Eliminar producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/libros/${id}`);
      setLibros(libros.filter((item) => item._id !== id));
    } catch (error) {
      console.log(`No se puedo eliminar el producto ${error}`);
    }
  };
  // end

  // Enviar datos del formulario
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    await Add(data, 'libros');
    reset();

    fetchLibros(); // Se ejecuta la funcion cuando envio los datos
  });
  // end

  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Productos</h1>
        <button onClick={handleClick}>Agregar Libro</button>
      </HeaderPanel>

      <ul className='flex justify-around border mb-4'>
        <li>Producto</li>
        <li>Estado</li>
        <li>Precio</li>
        <li>Formato</li>
      </ul>

      <ul className='overflow-y-scroll'>
        {libros.map((libro) => (
          <ItemCard key={libro._id}>
            <span>{libro.nombre}</span>
            <span>{libro.estado}</span>
            <span>{libro.precio}</span>
            <span>{libro.formato}</span>

            <span className='flex gap-1'>
              <button
                onClick={() => {
                  setSelectId(libro._id);
                  handleClickDelete();
                }}
              >
                Eliminar
              </button>
              <button>Actualizar</button>
            </span>
          </ItemCard>
        ))}
      </ul>

      <ModalDelete classState={stateButton} onClosed={handleClickDelete}>
        <h2>¿Estas seguro que quieres eliminar este producto?</h2>
        <button
          onClick={() => {
            eliminarProducto(selectId);
            handleClickDelete();
          }}
        >
          Confirmar
        </button>
      </ModalDelete>

      <Formulario classState={state} onClosed={handleClick}>
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
