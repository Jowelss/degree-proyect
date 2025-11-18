export function Panel({ children }) {
  return (
    <section className='overflow-hidden w-[1100px] rounded-2xl bg-white p-4 font-medium'>
      {children}
    </section>
  );
}
