import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../Header.jsx';

import Tienda from '../pages/Tienda.jsx';
import Eventos from '../pages/Eventos.jsx';
import Reuniones from '../pages/Reuniones.jsx';

import { Modal } from '../Modal.jsx';

function AppRoutes() {
  const dara = {
    modalTienda: (
      <Tienda>
        <Modal />
      </Tienda>
    ),
    modalEvento: (
      <Eventos>
        <Modal />
      </Eventos>
    ),
  };

  return (
    <BrowserRouter>
      <Header />
      <div className='flex justify-center items-center '>
        <Routes>
          <Route path='/tienda' element={dara.modalTienda} />
          <Route path='/eventos' element={<Eventos />} />
          <Route path='/reuniones' element={<Reuniones />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
