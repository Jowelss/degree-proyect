export function Panel({ children }) {
  return (
    <section className='w-[1100px] h-[500px] border rounded-2xl overflow-hidden'>
      {children}
    </section>
  );
}
