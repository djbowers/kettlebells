import { Outlet } from 'react-router-dom';

import { Header } from '../components';

export const Page = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col mt-2 space-y-4 px-3">
        <Outlet />
      </div>
    </>
  );
};
