import { useState, useEffect } from 'react';

// component
import { Modal } from '../components/Modal.jsx';
// end

// services
import { Get } from '../services/Get.jsx';
// end

function TiendaCliente() {
  const [selectProduct, setSelectProduct] = useState(null);

  //Modal de compra
  const [isOpen, setIsOpen] = useState(false);
  const state = isOpen ? 'block' : 'hidden';

  const handleClick = (item) => {
    setIsOpen(item);

    setSelectProduct(item);
  };
  //end

  //Obtencion de datos API
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
  //end

  const [isOpenCart, setIsOpenCart] = useState(false);
  const stateCart = isOpenCart ? 'block' : 'hidden';

  const handleClickCart = () => setIsOpenCart(!isOpenCart);

  const [isAddCart, setAddCart] = useState([]);

  const addToCart = (item) => setAddCart((prev) => [...prev, item]);

  return (
    <>
      <button onClick={handleClickCart}>Carrito</button>

      <Modal classState={stateCart}>
        <button onClick={handleClickCart}>Cerrar</button>

        <div>
          {isAddCart.map((item) => (
            <div key={item._id}>
              <h1>{item.nombre}</h1>
            </div>
          ))}
        </div>
      </Modal>

      <div className='w-full flex justify-center gap-4 mt-10'>
        {producto.map((item) => (
          <ul
            className='border w-70 cursor-pointer'
            onClick={() => handleClick(item)}
            key={item._id}
          >
            <div className='flex justify-center w-full h-60 mb-1 bg-fuchsia-300'>
              <img
                className='object-contain h-full'
                src={item.imagen}
                alt='Imagen'
              />
            </div>

            <li className='text-end'>{item.estado}</li>
            <li>{item.nombre}</li>
            <li>{item.precio}bs</li>
          </ul>
        ))}

        <Modal classState={state}>
          {selectProduct && (
            <div className='max-w-full flex gap-3' key={selectProduct._id}>
              <div className='flex justify-center min-w-100 h-100 bg-fuchsia-300'>
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

                <span className='border'>{selectProduct.genero}</span>

                <div>
                  <span className='text-7xl font-bold'>
                    {selectProduct.precio}
                  </span>
                  <span className='text-2xl font-semibold'>bs</span>
                </div>

                <div>
                  <button
                    onClick={() => {
                      addToCart(selectProduct);
                      handleClick();
                    }}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default TiendaCliente;
