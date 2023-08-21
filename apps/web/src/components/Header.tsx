import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { Button } from './Button';
import { Dropdown } from './Dropdown';

export const Header = () => {
  const navigate = useNavigate();

  const handleClickHome = () => navigate('/');
  const handleClickAccount = () => navigate('/account');
  const handleClickHistory = () => navigate('/history');
  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="flex h-5 items-center border-b px-2 py-1">
      <div
        onClick={handleClickHome}
        className="cursor-pointer hover:text-blue-300"
      >
        Kettlebells
      </div>
      <div className="flex grow justify-end">
        <Dropdown
          trigger={
            <UserCircleIcon className="h-3 w-3 cursor-pointer text-white hover:text-blue-300" />
          }
          options={[
            <Button
              key="history"
              onClick={handleClickHistory}
              className="w-full px-1 py-0.5"
            >
              History
            </Button>,
            <Button
              key="account"
              onClick={handleClickAccount}
              className="w-full px-1 py-0.5"
            >
              Account
            </Button>,
            <Button
              key="signout"
              onClick={handleSignOut}
              className="w-full px-1 py-0.5"
            >
              Sign Out
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};
