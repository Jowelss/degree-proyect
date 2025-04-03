import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; //IMPORTACION DEL CSS
import App from "./App.jsx"; //IMPORTACION DEL PRIMER COMPONENTE POR DEFECTO

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App text="Boton 1" />
    <App text="Boton 2" />
    <App text="Boton 3" />
  </StrictMode>
);
