import { useState, useEffect } from 'react';

import { Get } from '../../services/Get.jsx';

function Eventos() {
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    const data = await Get('eventos');

    setEventos(data);
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  return (
    <div className='my-11 grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5'>
      {eventos.map((item) => (
        <div
          className='relative bg-pink-700 rounded-2xl overflow-hidden'
          key={item._id}
        >
          <div className='w-full h-[500px]'>
            <img
              className='object-cover object-center w-full h-full '
              src={item.imagen}
            />
          </div>

          <div className='p-4 absolute inset-0 flex items-end text-white bg-gradient-to-t from-black to-black/10'>
            <div>
              <h1 className='mb-6 pl-2 text-5xl font-bold'>{item.nombre}</h1>

              <div className='p-2 bg-white/10 rounded-2xl'>
                <p className='mb-1 text-gray-300'>{item.descripcion}</p>

                <div className='flex justify-between items-center'>
                  <div className='flex gap-2 font-bold text-gray-300'>
                    <p>{item.ubicacion}</p>
                    <span className='font-bold text-pink-400'>|</span>
                    <p>{new Date(item.fecha).toLocaleDateString()}</p>
                    <span className='font-bold text-pink-400'>|</span>
                    <p>{item.hora}</p>
                  </div>

                  <button className='px-2 py-1 bg-pink-400 rounded-2xl font-medium'>
                    Asistir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Eventos;
