import { Outlet } from 'react-router-dom';

import SideBar from '../admin/components/SideBar.jsx';

function Dashboard() {
  return (
    <div className='flex flex-col min-h-screen bg-gray-100'>
      <div className='max-w-[1500px] mx-auto my-3 px-3 flex-1 flex justify-between gap-2 w-full'>
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
