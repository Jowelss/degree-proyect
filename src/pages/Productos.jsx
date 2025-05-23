import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// componentes
import { Formulario } from '../components/Formulario.jsx';
import { Panel } from '../components/Panel.jsx';
import { HeaderPanel } from '../components/HeaderPanel.jsx';
import Libro from '../components/Libro.jsx';
// end

import { Get } from '../services/Get';
import { Add } from '../services/Add';

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
    fetchLibros();
  }, []);
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

      <div className='overflow-y-scroll'>
        {libros.map((item) => (
          <Libro key={item._id}>
            <li>{item.nombre}</li>
            <li>{item.estado}</li>
            <li>{item.precio}</li>
            <li>{item.formato}</li>

            <li className='flex gap-1'>
              <button>Eliminar</button>
              <button>Actualizar</button>
            </li>
          </Libro>
        ))}
      </div>

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
