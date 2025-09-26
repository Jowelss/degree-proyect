export function Panel({ children }) {
  return (
    <section className='w-[1100px] rounded-2xl overflow-hidden shadow border-t-4 border-purple-800'>
      {children}
    </section>
  );
}
