import { Routes, Route, useRoutes } from 'react-router-dom';

import Dashboard from '../pages/Dashboard.jsx';
import Inicio from '../pages/Inicio.jsx';

import Productos from '../pages/Productos.jsx';
import Eventos from '../pages/Eventos.jsx';
import Blog from '../pages/Blog.jsx';
import Contacto from '../pages/Contacto.jsx';
import DueloAnimal from '../pages/DueloAnimal.jsx';
import Coaching from '../pages/Coaching.jsx';
import Suscripciones from '../pages/Suscripciones.jsx';

function AppRoutes() {
  return useRoutes([
    {
      path: '/dashboard/*',
      element: <Dashboard />,
      children: [
        { path: 'productos', element: <Productos /> },
        { path: 'eventos', element: <Eventos /> },
        { path: 'blog', element: <Blog /> },
        { path: 'suscripciones', element: <Suscripciones /> },
        { path: 'coaching', element: <Coaching /> },
        { path: 'duelo-animal', element: <DueloAnimal /> },
        { path: 'contacto', element: <Contacto /> },
      ],
    },
  ]);
}

export default AppRoutes;
