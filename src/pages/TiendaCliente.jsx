import { useState, useEffect } from 'react';

import { ModalForm } from '../components/ModalForm';

import { Get } from '../services/Get.jsx';

function TiendaCliente() {
  const [selectProduct, setSelectProduct] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = (item) => {
    setIsOpen(item);
    setSelectProduct(item);
  };

  const [producto, setProducto] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('libros');

    if (data === undefined) {
      console.log('error pa');
    } else {
      setProducto(data);
    }
  };

  useEffect(() => {
    fetchLibros();
  }, []);

  return (
    <div className='w-full flex justify-center gap-4 mt-10'>
      {producto.map((item) => (
        <ul
          className='border w-70 cursor-pointer'
          onClick={() => handleClick(item)}
          key={item._id}
        >
          <div className='flex justify-center w-full h-60 mb-1 bg-fuchsia-300'>
            <img className='object-contain h-full' src={item.imagen} alt='' />
          </div>
          <li className='text-end'>{item.estado}</li>
          <li>{item.nombre}</li>
          <li>{item.precio}bs</li>
        </ul>
      ))}

      <ModalForm classState={state}>
        {selectProduct && (
          <div className='max-w-full flex gap-3' key={selectProduct._id}>
            <div className='min-w-100 h-100'>
              <img
                className='object-contain h-full'
                src={selectProduct.imagen}
                alt='Imagen'
              />
            </div>
            <div className='flex-1 overflow-hidden'>
              <div className='text-end'>
                <button onClick={() => handleClick(false)}>Cerrar</button>
              </div>
              <div className='break-words'>
                <span className='block text-4xl font-extrabold mb-2'>
                  {selectProduct.nombre}
                </span>
                <p className='mb-2'>{selectProduct.sinopsis}</p>
                <span>Autor: {selectProduct.autor}</span>
              </div>
              <div className='max-w-max flex gap-2 mb-2'>
                <span className='border'>{selectProduct.tapa}</span>
                <span className='border'>{selectProduct.hoja}</span>
              </div>
              <div>
                <span className='text-7xl font-bold'>
                  {selectProduct.precio}
                </span>
                <span className='text-2xl font-semibold'>bs</span>
              </div>
            </div>
          </div>
        )}
      </ModalForm>
    </div>
  );
}

export default TiendaCliente;
