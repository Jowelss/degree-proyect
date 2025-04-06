import { useState } from "react";

import Libro from "../Libro";

function Tienda({ stateModal }) {
  const [modalOff, setModal] = useState(false);

  const modal = modalOff ? stateModal : console.log("Sexo");

  const handleModal = () => {
    setModal(!modalOff);
  };

  return (
    <section className="w-[900px] border relative">
      <div className="flex justify-end items-center bg-gray-800 text-white p-4 mb-4">
        <button onClick={handleModal}>Agregar</button>
      </div>

      <Libro />
      {modal}
    </section>
  );
}

export default Tienda;
