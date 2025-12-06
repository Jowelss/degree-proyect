import { useState } from 'react';

import { ModalItem } from './ModalItem';

export function ButtonAdd({ text }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className='py-1 px-2 rounded-2xl bg-pink-400 text-white'
      >
        {text}
      </button>

      <ModalItem state={open ? 'block' : 'hidden'} />
    </>
  );
}
