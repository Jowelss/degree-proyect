import { HeaderPanel } from '../components/HeaderPanel';
import { DataHeader } from '../components/DataHeader';
import { Panel } from '../components/Panel';

function Blog() {
  return (
    <Panel>
      <HeaderPanel>
        <h1 className='text-4xl font-bold'>Blog</h1>
        <button
          className='p-1.5 rounded-xl'
          onClick={() => {
            setSelectId(null);
            reset();
            handleClick();
            changeName('Nuevo libro');
          }}
        >
          Publicar
        </button>
      </HeaderPanel>
      <DataHeader></DataHeader>
    </Panel>
  );
}

export default Blog;
