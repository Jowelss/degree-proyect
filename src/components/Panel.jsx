export function Panel({ children }) {
  return (
    <section className='w-[1100px]  shadow-[0_0_6px_0_#bababa] rounded-lg overflow-hidden p-4'>
      {children}
    </section>
  );
}
