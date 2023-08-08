import { Outlet } from 'react-router-dom';

import { Header } from './Header';

export const Root = () => {
  return (
    <div className="max-w-2xl w-full">
      <Header />
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
};
