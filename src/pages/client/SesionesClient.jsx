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
    <div className='mt-11 grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5'>
      {sesion.map((item) => (
        <div
          className='relative bg-pink-700 rounded-2xl overflow-hidden'
          key={item._id}
        >
          <div className='w-full h-[500px]'>
            <img
              className='object-cover object-center w-full h-full'
              src={item.imagen}
              alt='sexo'
            />
          </div>

          <div className='p-4 absolute inset-0 flex items-end text-white bg-gradient-to-t from-black to-black/10'>
            <div className='w-full'>
              <h1 className='mb-6 pl-2 text-6xl font-bold'>{item.titulo}</h1>

              <div className='w-full flex gap-2'>
                <div className='w-full p-2 bg-white/10 rounded-2xl flex justify-between items-center'>
                  <div>
                    <p className='text-gray-300 mb-4'>{item.descripcion}</p>

                    <div className='flex gap-2 font-bold'>
                      <p>{new Date(item.fecha).toLocaleDateString()}</p>
                      <span className='text-pink-400'>|</span>
                      <p>{item.hora}</p>
                    </div>
                  </div>

                  <a
                    className='w-max px-2 py-1 flex items-center rounded-2xl bg-pink-400 gap-1.5 hover:text-pink-700'
                    target='_blank'
                    href={item.link}
                  >
                    <FaLink className='text-ms' />
                    Unirse
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SesionesClient;
