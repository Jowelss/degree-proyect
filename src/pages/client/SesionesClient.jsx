import { useState, useEffect } from 'react';

import { Get } from '../../services/Get';

import { FaLink } from 'react-icons/fa';

function SesionesClient() {
  const [sesion, setSesion] = useState([]);

  const fetchEventos = async () => {
    const data = await Get('sesion');

    setSesion(data);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5'>
      {sesion.map((item) => (
        <div
          className='relative bg-pink-700 rounded-xl overflow-hidden'
          key={item._id}
        >
          <div className='w-full h-[500px]'>
            <img
              className='object-cover object-center w-full h-full'
              src={item.imagen}
              alt='sexo'
            />
          </div>

          <div className='bg-black/65 p-4 absolute inset-0 flex items-end text-white'>
            <div>
              <h1 className='mb-3 text-6xl'>{item.titulo}</h1>
              <p>{item.descripcion}</p>
              <div className='text-2xl flex gap-2'>
                <p>{new Date(item.fecha).toLocaleDateString()}</p>
                <span>|</span>
                <p>{item.hora}</p>
              </div>

              <a
                className='flex items-center w-max gap-1.5 hover:text-pink-700'
                target='_blank'
                href={item.link}
              >
                <FaLink className='text-ms' />
                Link de la reunion
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SesionesClient;
