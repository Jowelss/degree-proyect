import { useState } from 'react';
import { DropImagen } from './DropImagen';

function ModalQr({ classState, coso }) {
  const [isImagen, setImagen] = useState(null);

  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[600px] bg-white rounded-2xl overflow-hidden p-2'>
        <button onClick={coso}>Cerrar</button>
        <div className='w-full h-100 flex justify-center'>
          <DropImagen coso={setImagen}>
            {isImagen && (
              <img src={isImagen} alt='Qr' className='object-contain h-full' />
            )}
          </DropImagen>
        </div>

        <div className='w-full flex justify-center gap-3'>
          <button>Guardar</button>
          <button>Actualizar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalQr;
