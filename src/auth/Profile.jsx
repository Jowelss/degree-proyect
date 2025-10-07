import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <span>No logueado</span>;

  return (
    <div className='flex gap-1.5'>
      <img className='w-10 h-10' src={user.picture} alt={user.name} />

      <div>
        <span className='block'>{user.name}</span>
        <span className='block text-xs'>{user.email}</span>
      </div>
    </div>
  );
}

export default Profile;
