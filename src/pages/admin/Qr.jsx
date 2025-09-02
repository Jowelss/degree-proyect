import DropImgQr from './components/DropImgQr';

//Services
import { Get } from '../../services/Get';
import { Update } from '../../services/Update';
import { Delete } from '../../services/Delete';
// end

export default function Qr({ classState, children }) {
  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[500px] bg-white rounded-2xl overflow-hidden p-2'>
        {children}

        <DropImgQr />

        <div className='flex justify-around mt-1.5'>
          <button>Guardar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
  );
}
