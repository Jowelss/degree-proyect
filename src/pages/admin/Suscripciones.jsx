import { HeaderPanel } from '../../components/HeaderPanel';
import { Panel } from '../../components/Panel';
import { DataHeader } from '../../components/DataHeader.jsx';

function Suscripciones() {
  return (
    <Panel>
      <HeaderPanel>
        <h2 className='text-4xl font-bold'>SUSCRIPCIONES</h2>
      </HeaderPanel>

      <DataHeader></DataHeader>
    </Panel>
  );
}

export default Suscripciones;
