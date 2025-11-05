import { useRoutes } from 'react-router-dom';
import RequireAuth from '../auth/RequireAuth.jsx'; //Ojito

import Dashboard from '../pages/admin/Dashboard.jsx';

// Dashboard item
import Productos from '../pages/admin/Productos.jsx';
import Eventos from '../pages/admin/Eventos.jsx';
import Blog from '../pages/admin/Blog.jsx';
import Sesiones from '../pages/admin/Sesiones.jsx';
// end

import RoleRedirect from '../auth/RoleRedirect.jsx';

import Landing from '../pages/client/Landing.jsx';
import TiendaCliente from '../pages/client/TiendaCliente.jsx';
import BlogClient from '../pages/client/BlogClient.jsx';
import EventosClient from '../pages/client/EventosClient.jsx';
import Pay from '../pages/client/Pay.jsx';
import History from '../pages/client/History.jsx';
import SesionesClient from '../pages/client/SesionesClient.jsx';

function AppRoutes() {
  return useRoutes([
    { path: '/', element: <RoleRedirect /> },

    {
      path: '/dashboard/*',
      element: (
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      ),
      children: [
        { path: 'productos', element: <Productos /> },
        { path: 'eventos', element: <Eventos /> },
        { path: 'blog', element: <Blog /> },
        { path: 'sesiones', element: <Sesiones /> },
      ],
    },

    {
      path: '/landing/*',
      element: (
        <RequireAuth>
          <Landing />
        </RequireAuth>
      ),
      children: [
        { path: 'tiendaCliente', element: <TiendaCliente /> },
        { path: 'blogclient', element: <BlogClient /> },
        { path: 'eventosclient', element: <EventosClient /> },
        { path: 'tiendacliente/pay', element: <Pay /> },
        { path: 'history', element: <History /> },
        { path: 'sesiones', element: <SesionesClient /> },
      ],
    },
  ]);
}

export default AppRoutes;
