import { useState } from "react";

import Libro from "../Libro";

function Tienda({ modalAgregarBook }) {
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <section className="w-[900px] border">
      <div className="flex justify-end items-center bg-gray-800 text-white p-4 mb-4">
        <button onClick={handleModal}>Agregar</button>
      </div>

      <Libro />
      {modal ? modalAgregarBook : null}
    </section>
  );
}

export default Tienda;
