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
    <>
      <div className='grid grid-cols-[repeat(auto-fit,minmax(500px,1fr))] gap-5'>
        {eventos.map((item) => (
          <div
            className='relative bg-pink-700 rounded-xl overflow-hidden'
            key={item._id}
          >
            <div className='w-full h-[500px]'>
              <img
                className='object-cover object-center w-full h-full'
                src={item.imagen}
              />
            </div>

            <div className='p-4 absolute inset-0 z-40 flex items-end text-white'>
              <div>
                <h1 className='mb-3 text-6xl'>{item.nombre}</h1>
                <p>{item.descripcion}</p>
                <div className='text-2xl flex gap-2'>
                  <p>{new Date(item.fecha).toLocaleDateString()}</p>
                  <span>|</span>
                  <p>{item.hora}</p>
                </div>

                <p className='text-2xl'>{item.ubicacion}</p>
              </div>

              <button>Asistiras?</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Eventos;
