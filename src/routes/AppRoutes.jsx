import { Routes, Route, useRoutes } from 'react-router-dom';

import Dashboard from '../pages/private/Dashboard.jsx';
import Inicio from '../pages/private/Inicio.jsx';

// Dashboard item
import Productos from '../pages/public/Productos.jsx';
import Eventos from '../pages/public/Eventos.jsx';
import Blog from '../pages/public/Blog.jsx';
import Sesiones from '../pages/public/Sesiones.jsx';
import Suscripciones from '../pages/public/Suscripciones.jsx';
// end

import Landing from '../pages/Landing.jsx';
import TiendaCliente from '../pages/TiendaCliente.jsx';
import BlogClient from '../pages/BlogClient.jsx';
import EventosClient from '../pages/EventosClient.jsx';

function AppRoutes() {
  return useRoutes([
    { path: '/', element: <Inicio /> },
    {
      path: '/dashboard/*',
      element: <Dashboard />,

      children: [
        { path: 'productos', element: <Productos /> },
        { path: 'eventos', element: <Eventos /> },
        { path: 'blog', element: <Blog /> },
        { path: 'suscripciones', element: <Suscripciones /> },
        { path: 'sesiones', element: <Sesiones /> },
      ],
    },
    {
      path: '/landing/*',
      element: <Landing />,
      children: [
        { path: 'tiendaCliente', element: <TiendaCliente /> },
        { path: 'blogclient', element: <BlogClient /> },
        { path: 'eventosclient', element: <EventosClient /> },
      ],
    },
  ]);
}

export default AppRoutes;
