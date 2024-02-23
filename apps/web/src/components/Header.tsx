import { UserCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabaseClient';
import { Badge } from './Badge';
import { Dropdown } from './Dropdown';
import { Link } from './Link';

export const Header = () => {
  const navigate = useNavigate();

  const handleClickHome = () => navigate('/');
  const handleClickAccount = () => navigate('/account');
  const handleClickHistory = () => navigate('/history');
  const handleClickCommunity = () => {
    window.open('https://discord.gg/BrBp87mSbA', '_blank');
  };
  const handleSignOut = () => supabase.auth.signOut();

  return (
    <div className="flex h-5 items-center border-b px-2 py-1">
      <div
        onClick={handleClickHome}
        className="hover:text-action flex cursor-pointer items-center gap-1"
      >
        <h1>Bellskill</h1>
        <Badge label="alpha" size="small" status="warning" />
      </div>
      <div className="flex grow justify-end">
        <Dropdown
          trigger={
            <UserCircleIcon className="hover:text-action text-default h-3 w-3 cursor-pointer" />
          }
          options={[
            <Link
              key="home"
              onClick={handleClickHome}
              className="w-full px-1 py-0.5"
            >
              Home
            </Link>,
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
