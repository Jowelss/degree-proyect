import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard.jsx';
import Login from '../pages/Login.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <div className='flex justify-center items-center '>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
