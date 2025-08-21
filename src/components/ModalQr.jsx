import QR from '../assets/QR.jpg';

function ModalQr({ classState, coso }) {
  return (
    <div
      className={`${classState} fixed inset-0 flex justify-center items-center bg-[#00000091]`}
    >
      <div className='w-[600px] bg-white rounded-2xl overflow-hidden p-2'>
        <button onClick={coso}>Cerrar</button>
        <div className='w-full h-100 flex justify-center'>
          <img className='object-contain h-full' src={QR} alt='QR' />
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
