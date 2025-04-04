import { useState } from "react";

import Header from "./Header.jsx";
import Inicio from "./Inicio";
import Eventos from "./Eventos";

function App() {
  const [activarInicio, setActivarInicio] = useState(true);

  function cambiarEstado() {
    setActivarInicio(!activarInicio);
  }
  return (
    <>
      <Header state={cambiarEstado} />
      {activarInicio ? <Inicio /> : <Eventos />}
    </>
  );
}

export default App;
