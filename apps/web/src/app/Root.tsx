import { Header } from '../components';
import { Outlet } from 'react-router-dom';

export const Root = () => {
  return (
    <div className="bg-gray-900 border rounded-lg">
      <Header />
      <div className="p-2">
        <Outlet />
      </div>
    </div>
  );
};
