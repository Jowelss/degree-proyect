import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <span>No logueado</span>;

  return (
    <div className=''>
      <img className='w-10 h-10' src={user.picture} alt={user.name} />
    </div>
  );
}

export default Profile;
