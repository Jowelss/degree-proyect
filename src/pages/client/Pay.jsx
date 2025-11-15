import { useNavigate, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';

import { IoMdArrowRoundBack } from 'react-icons/io';

import axios from 'axios';
import { Get } from '../../services/Get';
import { Add } from '../../services/Add';
import { Update } from '../../services/Update';

function Pay() {
  const { user } = useAuth0();

  const [status, setStatus] = useState('idle');
  const [voucher, setVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { cart, total, producto } = location.state || {
    cart: [],
    total,
    producto: [],
  };

  const items = cart.map((item) => ({
    libroId: item._id,
    imagen: item.imagen,
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
  }));

  const onDrop = async (acceptedFiles) => {
    setStatus('loading');
    setVoucherError(false);

    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      setVoucher(res.data.secure_url);
      setStatus('ready');
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const BuyProducts = handleSubmit(async (data) => {
    if (!voucher) {
      setVoucherError(true);
      return;
    }

    try {
      const orden = {
        userId: user.sub,
        items,
        voucher,
        nombre: data.nombre,
        telefono: data.telefono,
        email: user.email,
        total,
      };

      for (const item of producto) {
        const { _id, ...data } = item;

        if (data.cantidad === 0) {
          data.estado = 'Agotado';
        }

        await Update(_id, 'libros', data);
      }

      await Add(orden, 'orden');

      const mensaje = `
Hola, soy ${data.nombre}.
Quiero confirmar mi compra.

📦 Productos:
${items
  .map((item) => `- ${item.nombre} x${item.cantidad} — ${item.precio} Bs`)
  .join('\n')}

💰 Total: ${total} Bs

🧾 Comprobante: ${voucher}
    `;

      const numeroAutentica = import.meta.env.VITE_NUMBER_AUTENTICA;

      const urlWhatsapp = `https://wa.me/${numeroAutentica}?text=${encodeURIComponent(
        mensaje
      )}`;

      window.open(urlWhatsapp, '_blank');

      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  });

  //Obtiene datos de la API Qr
  const [qr, setQr] = useState(null);

  const getQr = async () => {
    const data = await Get('qr');

    setQr(data[0].imagen);
  };

  useEffect(() => {
    getQr();
  }, []);
  // end

  return (
    <div className='min-h-screen p-2 flex justify-center items-center bg-gray-100 font-medium text-black/90'>
      <div>
        <button
          className='mb-4 py-1 px-2 flex gap-1 items-center bg-gray-200 text-pink-500 rounded-2xl'
          onClick={() => navigate(-1)}
        >
          <IoMdArrowRoundBack />
          <span>Cancelar</span>
        </button>

        <div className='flex flex-wrap justify-center gap-5'>
          <div className='max-w-100 mb-5'>
            {
              <div className='flex flex-col gap-3'>
                {cart.map(
                  (item) =>
                    item.cantidad > 0 && (
                      <div
                        className='p-2 flex justify-between items-center gap-5 bg-white rounded-2xl'
                        key={item._id}
                      >
                        <span>{item.nombre}</span>
                        <span>x{item.cantidad}</span>
                        <span>{item.precio}bs</span>
                      </div>
                    )
                )}
              </div>
            }
          </div>

          <div className='flex items-center p-2 bg-white rounded-2xl'>
            <div className='w-60 h-[400px] p-3 flex items-center justify-center'>
              {qr ? (
                <img
                  className='object-contain h-full w-full rounded-2xl'
                  src={qr}
                  alt='Qr'
                />
              ) : (
                <span className='text-gray-400'>El Qr no esta disponible</span>
              )}
            </div>
          </div>

          <div className='p-2 bg-white rounded-2xl'>
            <div className='w-90 h-60 mb-3'>
              <div
                {...getRootProps()}
                className={`
                ${
                  isDragActive
                    ? 'border-pink-400 bg-pink-100 text-pink-400'
                    : 'border-gray-300'
                }
                  drop-imagen rounded-2xl text-gray-400 border`}
              >
                <input {...getInputProps()} />
                {status === 'idle' && (
                  <span>Agrega/Arrastra tu comprobante de pago</span>
                )}
                {status === 'loading' && <span>Cargando</span>}
                {status === 'ready' && (
                  <img
                    className='object-contain h-full'
                    src={voucher}
                    alt='Voucher'
                  />
                )}
              </div>

              {voucherError && (
                <p className='pl-2 text-red-500 text-sm mt-1'>
                  Debes subir tu comprobante de pago*
                </p>
              )}
            </div>

            <form onSubmit={BuyProducts}>
              <div className='mb-5'>
                <label className='text-pink-500'>Nombre</label>
                <input
                  className='border-gray-200 py-1 px-3 text-gray-600 bg-white rounded-2xl max-w-70 focus:border-pink-400 focus:outline-none'
                  type='text'
                  {...register('nombre', {
                    required: 'Debes ingresar tu nombre*',
                  })}
                />
                {errors.nombre && (
                  <p className='pl-2 text-red-500 text-sm mt-1'>
                    {errors.nombre.message}
                  </p>
                )}
              </div>

              <div className='mb-3 flex justify-around items-center'>
                <button
                  className='text-pink-500 py-1 px-2 bg-gray-200 rounded-2xl'
                  type='submit'
                >
                  Finalizar compra
                </button>

                <span>TOTAL: {total}</span>
              </div>
            </form>

            <small className='block w-100 text-gray-400'>
              La confirmación de tu compra puede demorar máximo 24 horas.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;
