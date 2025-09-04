import { useNavigate, useLocation } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Get } from '../../services/Get';

function Pay() {
  const navigate = useNavigate();

  const location = useLocation();

  const { cart } = location.state || { cart: [] };

  const [qr, setQr] = useState(null);

  const getQr = async () => {
    const data = await Get('qr');

    setQr(data[0].imagen);
  };

  useEffect(() => {
    getQr();
  }, []);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    formData.append('upload_preset', 'autentica_loveSelf');

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drazdkofq/image/upload',
        formData
      );

      console.log(res.data.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className='flex justify-center items-center'>
      <div>
        <button className='mb-2' onClick={() => navigate(-1)}>
          Cerrar
        </button>

        <div className='flex gap-5'>
          <div className='h-[400px] flex justify-center bg-fuchsia-300 p-1'>
            <img className='object-contain h-full' src={qr} alt='Qr' />
          </div>

          <div>
            <div className='w-[300px] mb-3'>
              <div {...getRootProps()} className='drop-imagen'>
                <input {...getInputProps()} />
              </div>
            </div>

            <div className='mb-5'>
              {cart.length === 0 ? (
                <div className='h-20 flex items-center justify-center'>
                  <span>No hay productos agregados</span>
                </div>
              ) : (
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
              )}
            </div>

            <div>
              <button>Enviar</button>
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
