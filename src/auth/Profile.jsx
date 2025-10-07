import { useAuth0 } from '@auth0/auth0-react';

function Profile() {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) return <span>No logueado</span>;

  return (
    <div className='flex items-center gap-1.5'>
      <div className='w-8 h-8'>
        <img className='object-contain' src={user.picture} alt={user.name} />
      </div>

      <div>
        <span className='block text-sm'>{user.name}</span>
        <span className='block text-xs'>{user.email}</span>
      </div>
    </div>
  );
}

export default Profile;
