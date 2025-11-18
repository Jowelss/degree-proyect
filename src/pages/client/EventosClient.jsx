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
    <div className='mt-11 grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5'>
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

          <div className='p-4 absolute inset-0 flex items-end text-white font-medium bg-gradient-to-t from-black to-black/10'>
            <div>
              <div className='mb-3'>
                <h1 className='mb-3 uppercase text-6xl'>{item.nombre}</h1>
                <p>{item.descripcion}</p>
              </div>

              <div className='text-2xl flex gap-2'>
                <p className='text-2xl'>{item.ubicacion}</p>
                <span>|</span>
                <p>{new Date(item.fecha).toLocaleDateString()}</p>
                <p>{item.hora}</p>
              </div>
            </div>

            <button>Asistiras?</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Eventos;
