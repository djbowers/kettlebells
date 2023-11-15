import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react';

import { Button, Input, Page } from '~/components';
import { useSession } from '~/contexts';
import { supabase } from '~/supabaseClient';

export const AccountPage = () => {
  const session = useSession();

  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    async function getProfile() {
      setLoading(true);
      const { user } = session;

      let { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setUsername(data.username);
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

  return (
    <Page>
      <form onSubmit={updateProfile} className="flex flex-col space-y-2">
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

        <div className="flex justify-end">
          <Button type="submit" loading={loading}>
            Update
          </Button>
        </div>
      </form>
    </Page>
  );
};
