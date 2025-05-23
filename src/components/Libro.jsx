function Libro({ children }) {
  return (
    <ul className='h-12 flex justify-between items-center border'>
      {children}
    </ul>
  );
}

export default Libro;
