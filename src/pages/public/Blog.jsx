import { Outlet } from 'react-router-dom';
import { HeaderPanel } from '../../components/HeaderPanel';
import { Panel } from '../../components/Panel';

import BlogSideBar from '../../components/BlogSideBar';

function Blog() {
  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Blog</h1>

        <BlogSideBar />

        <button>Publicar</button>
      </HeaderPanel>

      <div>
        <Outlet />
      </div>
    </Panel>
  );
}

export default Blog;
