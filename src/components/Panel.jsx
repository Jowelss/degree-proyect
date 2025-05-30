export function Panel({ children }) {
  return (
    <section className='w-[1100px] h-[500px] rounded-2xl overflow-hidden shadow'>
      {children}
    </section>
  );
}
