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

    setselectedProduct(item);
  };
  //end

  //Obtencion de datos API
  const [products, setproducts] = useState([]);

  const fetchLibros = async () => {
    const data = await Get('libros');

    if (data === undefined) {
      console.log('error pa');
    } else {
      setproducts(data);
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

  // Estado de seleccion del products
  const [selectedProduct, setselectedProduct] = useState(null);
  // end

  const [isAddCart, setAddCart] = useState([]);

  const addToCart = (selectProduct) => {
    // Esto resta la cantidad del products
    const productsExiste = products.find(
      (item) => item._id === selectProduct._id
    );

    if (!productsExiste || productsExiste.cantidad <= 0) {
      return productsExiste;
    }

    setproducts((prev) =>
      prev.map((item) =>
        item._id === selectProduct._id
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
    // end

    //Funcion de agregar products al carrito
    setAddCart((prevCart) => {
      // Verifica si el elemento existe
      const productFound = prevCart.find(
        (item) => item._id === selectProduct._id
      );

      if (productFound) {
        return prevCart.map((item) =>
          item._id === selectProduct._id
            ? {
                ...item,
                cantidad: item.cantidad + 1,
                precio: (item.cantidad + 1) * selectProduct.precio,
              }
            : item
        );
      } else {
        return [...prevCart, { ...selectProduct, cantidad: 1 }];
      }
    });
  };
  //end

  // Funcion para disminuir la cantidad de productss
  const decreaseQuantity = (product) => {
    setAddCart((prevCart) => {
      const productFound = prevCart.find((item) => item._id === product._id);

      if (productFound) {
        return prevCart.map((item) =>
          item._id === product._id && item.cantidad > 0
            ? {
                ...item,
                cantidad: item.cantidad - 1,
              }
            : item
        );
      } else {
        return prevCart;
      }
    });
  };
  //end

  const fountItem = isAddCart.find((item) => item._id === selectedProduct._id);

  return (
    <>
      <button className='absolute right-10' onClick={() => handleClickCart()}>
        Carrito
      </button>

      {/* Modal del carrito */}
      <ModalCart classState={isOpenCart ? 'block' : 'hidden'}>
        <button onClick={() => handleClickCart()}>Cerrar</button>

        <div className='h-20 flex items-center justify-center'>
          <span>No hay productss agregados</span>
        </div>

        <div>
          {isAddCart.map(
            (item) =>
              item.cantidad > 0 && (
                <div
                  className='flex justify-between items-center border'
                  key={item._id}
                >
                  <span>{item.nombre}</span>
                  <span>{item.cantidad}</span>
                  <span>{item.precio}bs</span>
                  <button className='bg-red-900'>Eliminar</button>
                </div>
              )
          )}
        </div>

        <div className='flex justify-around'>
          <button>Ir a pagar</button>

          <span>Total:</span>
        </div>
      </ModalCart>

      {/* Carts views products */}
      <div className='w-full flex justify-center gap-4 mt-10'>
        {products.map((item) => (
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
      </div>
      {/* end */}

      {/* Modal para mostrar el products y poder comprar */}
      <Modal classState={isOpen ? 'block' : 'hidden'}>
        {selectedProduct && (
          <div className='max-w-full flex gap-3' key={selectedProduct._id}>
            <div className='flex justify-center min-w-100 h-100 bg-fuchsia-300'>
              <img
                className='object-contain h-full'
                src={selectedProduct.imagen}
                alt='Imagen'
              />
            </div>
            <div className='flex-1 overflow-hidden'>
              <div className='text-end'>
                <button onClick={() => handleClick(false)}>Cerrar</button>
              </div>

              <div className='break-words'>
                <span className='block text-4xl font-extrabold mb-2'>
                  {selectedProduct.nombre}
                </span>
                <p className='mb-2'>{selectedProduct.sinopsis}</p>
                <span>Autor: {selectedProduct.autor}</span>
              </div>

              <div className='max-w-max flex gap-2 mb-2'>
                <span className='border'>{selectedProduct.tapa}</span>
                <span className='border'>{selectedProduct.hoja}</span>
              </div>

              <span className='border'>{selectedProduct.genero}</span>

              <div className='flex items-end gap-10'>
                <div>
                  <span className='text-7xl font-bold'>
                    {selectedProduct.precio}
                  </span>
                  <span className='text-2xl font-semibold'>bs</span>
                </div>

                <span className='text-2xl font-bold'>
                  Cantidad: {selectedProduct.cantidad}
                </span>
              </div>

              <div>
                <div>
                  <button onClick={() => decreaseQuantity(selectedProduct)}>
                    Quitar
                  </button>

                  <span>{fountItem?.cantidad}</span>

                  <button onClick={() => addToCart(selectedProduct)}>
                    Agregar
                  </button>
                </div>

                <button onClick={() => addToCart(selectedProduct)}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
      {/* end */}
    </>
  );
}

export default TiendaCliente;
