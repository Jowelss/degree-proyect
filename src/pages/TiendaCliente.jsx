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
    <div className='border w-70 '>
      {producto.map((item) => (
        <ul onClick={handleClick} key={item._id}>
          <div className='flex justify-center w-full h-50 mb-1 bg-fuchsia-300'>
            <img className='object-contain h-full' src={item.imagen} alt='' />
          </div>
          <li className='text-end'>{item.estado}</li>
          <li>{item.nombre}</li>
          <li>{item.precio}bs</li>
        </ul>
      ))}

      <ModalForm classState={state}></ModalForm>
    </div>
  );
}

export default TiendaCliente;
