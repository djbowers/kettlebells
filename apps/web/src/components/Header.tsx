import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { Dropdown } from './Dropdown';
import { Link } from './Link';

export const Header = () => {
  const navigate = useNavigate();

  const handleClickHome = () => navigate('/');
  const handleClickAccount = () => navigate('/account');
  const handleClickHistory = () => navigate('/history');
  const handleClickCommunity = () => {
    window.location.href = 'https://discord.gg/BrBp87mSbA';
  };
  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="flex h-5 items-center border-b px-2 py-1">
      <div
        onClick={handleClickHome}
        className="hover:text-action cursor-pointer"
      >
        Bellskill
      </div>
      <div className="flex grow justify-end">
        <Dropdown
          trigger={
            <UserCircleIcon className="hover:text-action text-default h-3 w-3 cursor-pointer" />
          }
          options={[
            <Link
              key="history"
              onClick={handleClickHistory}
              className="w-full px-1 py-0.5"
            >
              History
            </Link>,
            <Link
              key="account"
              onClick={handleClickAccount}
              className="w-full px-1 py-0.5"
            >
              Account
            </Link>,
            <Link
              key="community"
              onClick={handleClickCommunity}
              className="w-full px-1 py-0.5"
            >
              Community
            </Link>,
            <Link
              key="signout"
              onClick={handleSignOut}
              className="w-full px-1 py-0.5"
            >
              Sign Out
            </Link>,
          ]}
        />
      </div>
    </div>
  );
};
