import { Link } from 'react-router-dom';

export default function BlogSideBar() {
  return (
    <ul className='flex gap-4'>
      <Link to={'/dashboard/blog/crecimiento'}>Crecimiento</Link>
      <Link to={'/dashboard/blog/adolescentes'}>Adolescentes</Link>
      <Link to={'/dashboard/blog/mujer_autentica'}>Mujer autentica</Link>
      <Link to={'/dashboard/blog/puro_amor'}>Puro amor</Link>
      <Link to={'/dashboard/blog/reflexiones'}>Reflexiones</Link>
    </ul>
  );
}
