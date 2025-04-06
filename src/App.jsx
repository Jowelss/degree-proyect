import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";

import Tienda from "./pages/Tienda.jsx";
import Eventos from "./pages/Eventos.jsx";
import Reuniones from "./pages/Reuniones.jsx";

import Modal from "./Modal.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Este header es estatico */}
      <div className="flex justify-center bg-gray-300">
        <Routes>
          <Route path="/tienda" element={<Tienda stateModal={<Modal />} />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/reuniones" element={<Reuniones />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
