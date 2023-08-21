import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Input, Loading } from '../components';
import { useSession } from '../contexts';
import { supabase } from '../supabaseClient';

export const Account = () => {
  const session = useSession();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website`)
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

  const handleGoBack = () => navigate('/');

  const handleSignout = () => supabase.auth.signOut();

  return (
    <form
      onSubmit={updateProfile}
      className="flex flex-col space-y-2 text-white"
    >
      <Input
        id="email"
        label="Email"
        value={session.user.email}
        disabled={true}
      />
      <Input
        id="name"
        label="Name"
        value={username}
        onChange={handleChangeUsername}
      />
      <Input
        id="website"
        label="Website"
        value={website}
        onChange={handleChangeWebsite}
      />

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? <Loading /> : 'Update'}
        </Button>
        <div className="flex grow justify-end gap-3">
          <Button onClick={handleGoBack}>Go Back</Button>
          <Button onClick={handleSignout}>Sign Out</Button>
        </div>
      </div>
    </form>
  );
};
