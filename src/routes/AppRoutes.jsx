import { Routes, Route, useRoutes } from 'react-router-dom';

import Dashboard from '../pages/private/Dashboard.jsx';
import Inicio from '../pages/private/Inicio.jsx';

import Productos from '../pages/public/Productos.jsx';
import Eventos from '../pages/public/Eventos.jsx';
import Blog from '../pages/public/Blog.jsx';
import Contacto from '../pages/public/Contacto.jsx';
import Coaching from '../pages/public/Coaching.jsx';
import Suscripciones from '../pages/public/Suscripciones.jsx';

// Navegacion del blog
import Crecimiento from '../pages/public/blog-items/Crecimiento.jsx';
import Adolescentes from '../pages/public/blog-items/Adolescentes.jsx';
import MujerAutentica from '../pages/public/blog-items/MujerAutentica.jsx';
import PuroAmor from '../pages/public/blog-items/PuroAmor.jsx';
import Reflexiones from '../pages/public/blog-items/Reflexiones.jsx';
// end

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
        { path: 'coaching', element: <Coaching /> },
        { path: 'contacto', element: <Contacto /> },
      ],
    },
  ]);
}

export default AppRoutes;
