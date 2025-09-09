import { useNavigate, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import axios from 'axios';
import { Get } from '../../services/Get';
import { Add } from '../../services/Add';

function Pay() {
  const { user } = useAuth0();

  const [status, setStatus] = useState('idle');
  const [voucher, setVoucher] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const { cart, total } = location.state || {
    cart: [],
    total,
  };

  const items = cart.map((item) => ({
    libroId: item._id,
    nombre: item.nombre,
    precio: item.precio,
    cantidad: item.cantidad,
  }));

  const BuyProducts = async () => {
    try {
      const orden = {
        userId: user.sub,
        items,
        voucher,
        total,
      };

      await Add(orden, 'orden');
    } catch (error) {
      console.log(error);
    }
  };

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

  const onDrop = async (acceptedFiles) => {
    setStatus('loading');
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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='flex justify-center items-center'>
      <div>
        <button className='mb-2' onClick={() => navigate(-1)}>
          Cancelar compra
        </button>

        <div className='flex gap-5'>
          <div className='h-[400px] flex justify-center bg-fuchsia-300 p-1'>
            <img className='object-contain h-full' src={qr} alt='Qr' />
          </div>

          <div>
            <div className='w-[400px] mb-3'>
              <div {...getRootProps()} className='drop-imagen'>
                <input {...getInputProps()} />
                {status === 'idle' && (
                  <span>Agrega tu comprobante de pago</span>
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
            </div>
            <div className='mb-5'>
              {
                <div className='flex flex-col gap-3'>
                  {cart.map(
                    (item) =>
                      item.cantidad > 0 && (
                        <div
                          className='flex justify-between items-center border'
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

            <span>TOTAL: {total}</span>

            <div>
              <button onClick={BuyProducts}>Enviar</button>
            </div>
            <span className=' block w-100'>
              La confirmación de tu compra puede demorar maximo 24horas, deja tu
              numero de telefono o correo electronico para contactarnos contigo.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pay;
