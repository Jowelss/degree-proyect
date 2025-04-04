function Header({ state }) {
  return (
    <header className="flex justify-center items-center bg-gray-800 text-white p-4 mb-4">
      <ul className="flex space-x-4">
        <li>
          <button onClick={state}>INICIO</button>
        </li>
        <li>
          <button onClick={state}>EVENTOS</button>
        </li>
        <li>
          <button>REUNIONES</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
