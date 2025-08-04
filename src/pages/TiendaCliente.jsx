import { useState, useEffect } from 'react';

// component
import ModalCart from '../components/ModalCart.jsx';
import { Modal } from '../components/Modal.jsx';
// end

// services
import { Get } from '../services/Get.jsx';
// end

function TiendaCliente() {
  //Modal de compra
  const [isOpen, setIsOpen] = useState(false);

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

  //Modal de carrito
  const [isOpenCart, setIsOpenCart] = useState(false);

  const handleClickCart = () => setIsOpenCart(!isOpenCart);
  //end

  // Estado de seleccion del producto
  const [selectProduct, setSelectProduct] = useState(null);
  // end

  //Funcion de agregar producto al carrito
  const [isAddCart, setAddCart] = useState([]);

  const addToCart = (product) => {
    //Copiado de la IA debo modificar y entender
    const productFoundIndex = producto.findIndex(
      (item) => item._id === product._id
    );
    const productSelect = producto[productFoundIndex];

    // Si no hay stock, no hacemos nada
    if (!productSelect || productSelect.cantidad <= 0) return;

    // Reducir el stock del producto en lista
    const nuevosProductos = [...producto];
    nuevosProductos[productFoundIndex] = {
      ...productSelect,
      cantidad: productSelect.cantidad - 1,
    };

    setProducto(nuevosProductos);
    // end

    setAddCart((prevCart) => {
      const productFound = prevCart.find((item) => item._id === product._id);

      if (productFound) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                cantidad: item.cantidad++,
                precio: item.precio + product.precio,
              }
            : item
        );
      } else {
        return [...prevCart, { ...product, cantidad: 1 }];
      }
    });
  };
  //end

  return (
    <>
      <button className='absolute right-10' onClick={() => handleClickCart()}>
        Carrito
      </button>

      {/* Modal del carrito */}
      <ModalCart classState={isOpenCart ? 'block' : 'hidden'}>
        <button onClick={() => handleClickCart()}>Cerrar</button>

        <div className='h-20 flex items-center justify-center'>
          <span>No hay productos agregados</span>
        </div>

        <div>
          {isAddCart.map((item) => (
            <div
              className='flex justify-between items-center border'
              key={item._id}
            >
              <span>{item.nombre}</span>
              <span>{item.cantidad}</span>
              <span>{item.precio}</span>
              <button className='bg-red-900'>Eliminar</button>
            </div>
          ))}
        </div>
        {/* end */}

        <button>Ir a pagar</button>
      </ModalCart>

      {/* Carts productos */}
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
            <li>{item.cantidad} unidades</li>
          </ul>
        ))}
        {/* end */}

        {/* Modal para mostrar el producto con sus especificaciones */}
        <Modal classState={isOpen ? 'block' : 'hidden'}>
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

                <div className='flex items-end gap-10'>
                  <div>
                    <span className='text-7xl font-bold'>
                      {selectProduct.precio}
                    </span>
                    <span className='text-2xl font-semibold'>bs</span>
                  </div>

                  <span className='text-2xl font-bold'>
                    Cantidad: {selectProduct.cantidad}
                  </span>
                </div>

                <div>
                  <button onClick={() => addToCart(selectProduct)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
        {/* end */}
      </div>
    </>
  );
}

export default TiendaCliente;
