import { useState, useEffect } from 'react';

import { ModalForm } from '../components/ModalForm';

import { Get } from '../services/Get.jsx';

function TiendaCliente() {
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = () => setIsOpen(!isOpen);

  const [producto, setProducto] = useState([]);

  const fetchLibros = async () => {
    // Abrir y cerrar el modal

    const data = await Get('libros');

    if (data === undefined) {
      console.log('error pa');
    } else {
      console.log(data);
      setProducto(data);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div className='w-full mt-10'>
      {producto.map((item) => (
        <ul className='border w-70' onClick={handleClick} key={item._id}>
          <div className='flex justify-center w-full h-50 mb-1 bg-fuchsia-300'>
            <img className='object-contain h-full' src={item.imagen} alt='' />
          </div>
          <li className='text-end'>{item.estado}</li>
          <li>{item.nombre}</li>
          <li>{item.precio}bs</li>
        </ul>
      ))}

      <ModalForm classState={state}>
        {producto.map((item) => (
          <div className='max-w-full flex gap-3' key={item._id}>
            <div className='min-w-100 h-100'>
              <img
                className='object-contain h-full'
                src={item.imagen}
                alt='Imagen'
              />
            </div>
            <div className='flex-1 overflow-hidden'>
              <div className='text-end'>
                <button onClick={handleClick}>Cerrar</button>
              </div>
              <div className='break-words'>
                <span className='block text-4xl font-extrabold mb-2'>
                  {item.nombre}
                </span>
                <p className='mb-2'>{item.sinopsis}</p>
                <span>Autor: {item.autor}</span>
              </div>
              <div className='max-w-max flex gap-2 mb-2'>
                <span className='border'>{item.tapa}</span>
                <span className='border'>{item.hoja}</span>
              </div>
              <div>
                <span className='text-7xl'>{item.precio}</span>
                <span className='text-2xl'>bs</span>
              </div>
            </div>
          </div>
        ))}
      </ModalForm>
    </div>
  );
}

export default TiendaCliente;
