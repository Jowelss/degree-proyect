export function Header({ children }) {
  return (
    <header className='px-6 py-2 flex justify-between items-center bg-white fixed top-0 z-50 w-full'>
      {children}
    </header>
  );
}
