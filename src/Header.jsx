import { useState } from "react";

function Header() {
  const [active, setActive] = useState("block");

  const coso = active ? "hidden" : "block";

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <header className="flex justify-center items-center bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <button onClick={handleClick}>{coso}</button>
        </li>
        <li>
          <button>EVENTOS</button>
        </li>
        <li>
          <button>REUNIONES</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
