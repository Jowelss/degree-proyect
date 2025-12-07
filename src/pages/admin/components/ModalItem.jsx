import { IoClose } from 'react-icons/io5';

export function ModalItem({ onClose, children, title }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex justify-center items-center bg-[#00000091]`}
    >
      <div className=' p-4 bg-white rounded-2xl overflow-hidden'>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-4xl'>{title}</span>

          <button onClick={() => onClose(false)}>
            <IoClose className='text-2xl bg-pink-400 rounded-full text-white' />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
