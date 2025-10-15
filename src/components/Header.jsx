export function Header({ children }) {
  return (
    <header className='px-6 py-2 grid grid-flow-col auto-cols-fr bg-white fixed top-0 z-50 w-full'>
      {children}
    </header>
  );
}
