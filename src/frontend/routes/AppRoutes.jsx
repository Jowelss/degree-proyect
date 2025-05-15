import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard.jsx';
import Inicio from '../pages/Inicio.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
