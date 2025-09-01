import { useState } from 'react';
import { useEffect } from 'react';

import DropImgQr from './components/DropImgQr';

//Services
import { Add } from '../../services/Add';
import { Get } from '../../services/Get';
import { Update } from '../../services/Update';
import { Delete } from '../../services/Delete';

export default function Qr({ classState, children }) {
  const [isQr, setQr] = useState(null);

  const onSubmit = () => {
    Add({ imagen: isQr }, 'qr');
  };

  const [Qr, setisQr] = useState(null);

  const fetchQr = async () => {
    const data = await Get('qr');

    if (data === undefined) {
      console.log('No funca');
    } else {
      setisQr(data);
    }
  };

  useEffect(() => {
    fetchQr();
  }, []);

  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[500px] bg-white rounded-2xl overflow-hidden p-2'>
        {children}

        <DropImgQr setQr={setQr}>
          {isQr && (
            <img
              className='object-contain h-full'
              src={isQr}
              alt='Qr de pago'
            />
          )}
        </DropImgQr>

        <div className='flex justify-around mt-1.5'>
          <button onClick={onSubmit}>Guardar</button>
          <button>Actualizar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
