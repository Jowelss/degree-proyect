import LoginButton from '../components/LoginButton';

function Login() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <h1 className='size-32'>ESTE ES LA SECCION DE LOGIN</h1>
      <div className='mr-1.5'>
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
