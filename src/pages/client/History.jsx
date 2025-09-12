import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { Get } from '../../services/Get.jsx';

function History() {
  const [history, setHistory] = useState([]);

  const { user } = useAuth0();

  const getHistory = async () => {
    const dataUser = await Get('orden');

    const dataProducts = await dataUser.filter(
      (item) => item.userId === user.sub
    );

    const allItems = await dataProducts.flatMap((item) => item.items);

    setHistory(allItems);
  };

  useEffect(() => {
    getHistory();
  }, [history]);

  return (
    <div className='flex flex-wrap gap-2'>
      {history.map((item) => (
        <ul className='border max-w-max flex items-center gap-3' key={item._id}>
          <li>
            <div className='w-20 h-20'>
              <img
                className='object-contain h-full'
                src={item.imagen}
                alt='Imagen'
              />
            </div>
          </li>
          <li>{item.nombre}</li>
          <li>x{item.cantidad}</li>
          <li>{item.precio}bs</li>
        </ul>
      ))}
    </div>
  );
}

export default History;
