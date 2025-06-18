import { Routes, Route, useRoutes } from 'react-router-dom';

import Dashboard from '../pages/private/Dashboard.jsx';
import Inicio from '../pages/private/Inicio.jsx';

import Productos from '../pages/public/Productos.jsx';
import Eventos from '../pages/public/Eventos.jsx';
import Blog from '../pages/public/Blog.jsx';
import Sesiones from '../pages/public/Sesiones.jsx';
import Suscripciones from '../pages/public/Suscripciones.jsx';

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
  ]);
}

export default AppRoutes;
