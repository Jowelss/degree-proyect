import { Header } from '../../components/Header';
import LoginButton from '../../auth/LoginButton.jsx';

function Inicio() {
  return (
    <>
      <Header>
        <header className='flex justify-around w-full'>
          <div>
            <h1>LOGO AUTENTICA</h1>
          </div>
          <div>
            <LoginButton />
          </div>
        </header>
      </Header>

      <main className='h-screen flex justify-center items-center'>
        <h1 className='text-6xl'>AUTENTICA</h1>
      </main>
    </>
  );
}

export default Inicio;
