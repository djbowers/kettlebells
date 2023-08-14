import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { Dropdown } from '../components/Dropdown';
import { supabase } from '../supabaseClient';

export const Header = () => {
  const navigate = useNavigate();

  const handleClickHome = () => navigate('/');
  const handleClickAccount = () => navigate('/account');
  const handleClickHistory = () => navigate('/history');
  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="border-b h-5 flex items-center px-2 py-1">
      <div
        onClick={handleClickHome}
        className="cursor-pointer hover:text-blue-300"
      >
        Kettlebells
      </div>
      <div className="grow flex justify-end">
        <Dropdown
          trigger={
            <UserCircleIcon className="h-3 w-3 text-white cursor-pointer hover:text-blue-300" />
          }
          options={[
            <Button
              key="history"
              onClick={handleClickHistory}
              className="px-1 py-0.5 w-full"
            >
              History
            </Button>,
            <Button
              key="account"
              onClick={handleClickAccount}
              className="px-1 py-0.5 w-full"
            >
              Account
            </Button>,
            <Button
              key="signout"
              onClick={handleSignOut}
              className="px-1 py-0.5 w-full"
            >
              Sign Out
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};
