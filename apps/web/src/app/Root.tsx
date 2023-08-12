import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const Root = () => {
  return (
    <>
      <Header />
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
};
