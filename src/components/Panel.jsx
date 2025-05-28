export function Panel({ children }) {
  return (
    <section className='w-[1100px] h-[500px] rounded-2xl overflow-hidden shadow-[0_0_10px_rgba(0,_0,_0,_0.1)]'>
      {children}
    </section>
  );
}
