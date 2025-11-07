import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// component
import ModalCart from '../../components/ModalCart.jsx';
import { Modal } from '../../components/Modal.jsx';
import ProductCard from '../../components/ProductCard';
// end

// icons
import { LuShoppingCart } from 'react-icons/lu';
import { IoIosAdd, IoIosRemove, IoIosClose } from 'react-icons/io';

// end

// services
import { Get } from '../../services/Get.jsx';
// end

function TiendaCliente() {
  const navigate = useNavigate();

  //Modal de compra
  const [isOpen, setIsOpen] = useState(false);
  //end

  //Obtencion de datos API
  const [products, setproducts] = useState([]);
  const [status, setStatus] = useState();

  const fetchLibros = async () => {
    setStatus('loading');
    const data = await Get('libros');

    if (data) {
      setStatus('ready');
      setproducts(data);
    } else {
      setStatus('error');
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

  const [isAddCart, setAddCart] = useState([]);

  const [cosos, setCosos] = useState([]);

  useEffect(() => {
    if (isAddCart.length > 0 && products.length > 0) {
      const combinados = isAddCart.map((c) => {
        const prod = products.find((p) => p._id === c._id); // busca coincidencia
        return prod;
      });

      setCosos(combinados);
    }
  }, [isAddCart, products]);

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

    //Funcion de agregar productos al carrito
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
              }
            : item
        );
      } else {
        return [...prevCart, { ...selectProduct, cantidad: 1 }];
      }
    });
  };
  //end

  // Funcion para disminuir la cantidad de un producto
  const decreaseQuantity = (selectProduct) => {
    // Esto devuelve la cantidad de un producto
    const productsExiste = products.find(
      (item) => item._id === selectProduct._id
    );

    if (!productsExiste || productsExiste.cantidad >= isAddCart.cantidad) {
      return productsExiste;
    }

    setproducts((prev) =>
      prev.map((item) =>
        item._id === selectProduct._id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
    // end

    setAddCart((prevCart) => {
      const productFound = prevCart.find(
        (item) => item._id === selectProduct._id
      );

      if (productFound) {
        if (productFound.cantidad > 1) {
          return prevCart.map((item) =>
            item._id === selectProduct._id
              ? {
                  ...item,
                  cantidad: item.cantidad - 1,
                }
              : item
          );
        } else {
          return prevCart.filter((item) => item._id !== selectProduct._id);
        }
      }
      return prevCart;
    });
  };
  //end

  const deleteProduct = (selectProduct) => {
    const productsExiste = products.find(
      (item) => item._id === selectProduct._id
    );

    if (!productsExiste || productsExiste.cantidad >= isAddCart.cantidad) {
      return productsExiste;
    }

    setproducts((prev) =>
      prev.map((item) =>
        item._id === selectProduct._id
          ? { ...item, cantidad: item.cantidad + selectProduct.cantidad }
          : item
      )
    );

    setAddCart((prevCart) => {
      if (prevCart.cantidad > 1) {
        return prevCart.map((item) =>
          item._id === selectProduct._id
            ? {
                ...item,
                cantidad: 0,
              }
            : item
        );
      } else {
        return prevCart.filter((item) => item._id !== selectProduct._id);
      }
    });
  };

  // Estado del total
  const [isTotal, setTotal] = useState(0);

  // useEffect para recalcular cada vez que cambie el carrito
  useEffect(() => {
    const total = isAddCart.reduce((acc, item) => {
      return acc + item.precio * item.cantidad; // precio unitario * cantidad
    }, 0);

    setTotal(total);
  }, [isAddCart]);

  const fountItem = isAddCart.find((item) => item._id === isOpen._id);

  return (
    <>
      <div
        className={`${
          status === 'ready' ? 'hidden' : 'block'
        } h-full flex items-center justify-center`}
      >
        {status === 'loading' && <span>Cargando los productos</span>}
        {status === 'error' && <span>Error al acceder a los productos</span>}
      </div>

      <div className='flex items-center text-white sticky top-20 left-full rounded-full max-w-max h-full bg-pink-400 z-10'>
        <button className='relative p-3' onClick={() => handleClickCart()}>
          <LuShoppingCart className='text-2xl' />
        </button>

        {isAddCart.length > 0 && (
          <span className='absolute bottom-[-4px] left-[-4px] flex items-center justify-center w-5 h-5 rounded-full bg-white text-pink-400 font-medium'>
            {isAddCart.length}
          </span>
        )}
      </div>

      {/* Modal del carrito */}
      <ModalCart classState={isOpenCart ? 'block' : 'hidden'}>
        <button
          className='w-full mb-3 text-end'
          onClick={() => handleClickCart()}
        >
          Cerrar
        </button>

        {/* Si no hay productos en el carrito muestra el mensaje caso contrario muestra los productos */}
        <div>
          {isAddCart.length === 0 ? (
            <div className='h-20 flex items-center justify-center'>
              <span>No hay productos agregados</span>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {isAddCart.map(
                (item) =>
                  item.cantidad > 0 && (
                    <div
                      className='flex justify-between items-center border'
                      key={item._id}
                    >
                      <span>{item.nombre}</span>
                      <span>x{item.cantidad}</span>
                      <span>{item.precio}bs</span>

                      <button
                        className='bg-red-900'
                        onClick={() => deleteProduct(item)}
                      >
                        Eliminar
                      </button>
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        <div className='flex justify-around mt-3'>
          <button
            onClick={() =>
              isAddCart.length > 0 &&
              navigate('/landing/tiendacliente/pay', {
                state: { cart: isAddCart, total: isTotal, producto: cosos },
              })
            }
          >
            Ir a pagar
          </button>

          <span>Total: {isTotal}</span>
        </div>
      </ModalCart>

      {/* Carts views products */}
      <div className='grid grid-cols-[repeat(auto-fit,minmax(200px,300px))] gap-5'>
        {products.map((item) => (
          <ProductCard key={item._id} item={item} onClick={setIsOpen} />
        ))}
      </div>
      {/* end */}

      {/* Modal para mostrar el products y poder comprar */}
      <Modal classState={isOpen ? 'block' : 'hidden'}>
        {products.map(
          (item) =>
            item._id === isOpen._id && (
              <div className='max-w-full max-h-max flex gap-3' key={item._id}>
                <div className='min-w-100 flex items-center bg-pink-400 p-2'>
                  <img
                    className='object-contain h-90 w-full'
                    src={item.imagen}
                    alt='Imagen'
                  />
                </div>

                <div className='text-black/90 flex-1 overflow-hidden p-2'>
                  <div className='text-end'>
                    <button onClick={() => setIsOpen(false)}>
                      <IoIosClose />
                    </button>
                  </div>

                  <div>
                    <div className='break-words'>
                      <span className='block text-3xl font-bold'>
                        {item.nombre}
                      </span>

                      <span className='font-medium text-pink-400'>
                        {item.autor}
                      </span>

                      <p className='my-2 text-gray-800'>{item.sinopsis}</p>
                    </div>

                    <div className='flex gap-2 font-medium'>
                      <span className='px-2 py-1 bg-gray-100 rounded-xl'>
                        {item.tapa}
                      </span>

                      <span className='px-2 py-1 bg-gray-100 rounded-xl'>
                        {item.hoja}
                      </span>

                      <span className='px-2 py-1 bg-gray-100 rounded-xl'>
                        {item.genero}
                      </span>
                    </div>

                    <div className='mt-3 pl-3 flex items-end gap-5 font-medium'>
                      <div>
                        <span className='text-4xl'>{item.precio}</span>
                        <span className='text-2xl'>bs</span>
                      </div>

                      <span>Stock: {item.cantidad}</span>
                    </div>

                    <div className='mt-4 mx-3 mb-2'>
                      {fountItem?.cantidad > 0 ? (
                        <div className='flex justify-between items-center'>
                          <div className='max-w-max px-2 py-1 flex items-center gap-4 bg-gray-100 rounded-xl'>
                            <button onClick={() => decreaseQuantity(item)}>
                              <IoIosRemove className='text-2xl' />
                            </button>

                            <span className='font-medium'>
                              {fountItem?.cantidad}
                            </span>

                            <button onClick={() => addToCart(item)}>
                              <IoIosAdd className='text-2xl' />
                            </button>
                          </div>

                          <div className='flex items-center gap-6 font-medium'>
                            <button
                              className='bg-gray-100'
                              onClick={() =>
                                isAddCart.length > 0 &&
                                navigate('/landing/tiendacliente/pay', {
                                  state: {
                                    cart: isAddCart,
                                    total: isTotal,
                                    producto: cosos,
                                  },
                                })
                              }
                            >
                              Ir a pagar
                            </button>

                            <span>Total: {isTotal}</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          className='px-2 py-1 rounded-xl font-medium bg-pink-400 text-white '
                          onClick={() => addToCart(item)}
                        >
                          Agregar al carrito
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </Modal>
      {/* end */}
    </>
  );
}

export default TiendaCliente;
