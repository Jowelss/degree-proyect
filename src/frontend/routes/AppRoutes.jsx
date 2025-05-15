import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard.jsx';
import Inicio from '../pages/Inicio.jsx';
import Productos from '../pages/Productos.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/inicio' element={<Inicio />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/productos' element={<Productos />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
