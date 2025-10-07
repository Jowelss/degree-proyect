export function Panel({ children }) {
  return (
    <section className='overflow-hidden w-[1100px] rounded-xl border border-gray-300 p-4'>
      {children}
    </section>
  );
}
