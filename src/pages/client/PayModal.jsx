import { useState, useEffect } from 'react';

import { Get } from '../../services/Get';

function PayModal({ setOpenModalQr, classState, products }) {
  const [qr, setQr] = useState(null);

  const getQr = async () => {
    const data = await Get('qr');

    setQr(data[0].imagen);
  };

  useEffect(() => {
    getQr();
  }, []);

  return (
    <div
      className={`${
        classState ? 'block' : 'hidden'
      } fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[600px] bg-white rounded-2xl overflow-hidden p-2'>
        <button onClick={() => setOpenModalQr(false)}>Cerrar</button>

        <div className='h-[400px] flex justify-center'>
          <img className='object-contain h-full' src={qr} alt='Qr' />
        </div>

        <div>
          {products.length === 0 ? (
            <div className='h-20 flex items-center justify-center'>
              <span>No hay productos agregados</span>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              {products.map(
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
      </div>
    </div>
  );
}

export default PayModal;
