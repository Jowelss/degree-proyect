import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header.jsx";
import Tienda from "./pages/Tienda.jsx";
import Eventos from "./pages/Eventos.jsx";
import Reuniones from "./pages/Reuniones.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header /> {/* Este header es estatico */}
      <div className="flex justify-center bg-amber-400">
        <Routes>
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/reuniones" element={<Reuniones />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
