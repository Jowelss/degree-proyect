import { Routes, Route, useRoutes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard.jsx';
import Inicio from '../pages/Inicio.jsx';

import Productos from '../pages/Productos.jsx';
import Eventos from '../pages/Eventos.jsx';
import Blog from '../pages/Blog.jsx';

function AppRoutes() {
  return useRoutes([
    {
      path: '/dashboard/*',
      element: <Dashboard />,
      children: [
        { path: 'productos', element: <Productos /> },
        { path: 'eventos', element: <Eventos /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
  ]);
}

export default AppRoutes;
