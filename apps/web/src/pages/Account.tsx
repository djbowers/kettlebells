import {
  useState,
  useEffect,
  FormEventHandler,
  ChangeEventHandler,
} from 'react';
import { supabase } from '../supabaseClient';
import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
}

export const Account = ({ session }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
        setWebsite(data.website);
      }

      setLoading(false);
    }

    getProfile();
  }, [session]);

  const updateProfile: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    setLoading(true);
    const { user } = session;

    const updates = {
      id: user.id,
      username,
      website,
      updated_at: new Date().toISOString(),
    };

    let { error } = await supabase.from('profiles').upsert(updates);

    if (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleChangeUsername: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const handleChangeWebsite: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWebsite(e.target.value);
  };

  const handleSignout = () => supabase.auth.signOut();

  return (
    <form onSubmit={updateProfile}>
      <div className="flex gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={session.user.email}
          disabled
          className="w-full"
        />
      </div>
      <div className="flex gap-1">
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          value={username || ''}
          onChange={handleChangeUsername}
          className="w-full"
        />
      </div>
      <div className="flex gap-1">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="url"
          value={website || ''}
          onChange={handleChangeWebsite}
        />
      </div>

      <div className="flex gap-3">
        <button
          className="button block primary"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>

        <button className="button block" type="button" onClick={handleSignout}>
          Sign Out
        </button>
      </div>
    </form>
  );
};
