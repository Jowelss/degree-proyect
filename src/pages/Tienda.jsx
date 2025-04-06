import { useState } from "react";

import { Modal } from "../Modal";

import Libro from "../Libro";

function Tienda() {
  const [modalOff, setModal] = useState(false);

  const modal = modalOff ? <Modal /> : console.log("Sexo");

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
