import { ChangeEventHandler, FormEventHandler, useState } from 'react';

import { Page } from '~/components/Page';

import { Button, Input, Loading } from '../../components';
import { supabase } from '../../supabaseClient';

export function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error?.message) {
      alert(error.message);
    } else {
      alert('Check your email for the login link!');
    }
    setLoading(false);
  };

  const handleChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col gap-2">
        <div className="text-default">
          <div className="font-bold">Kettlebells</div>
          <div>Sign in via magic link with your email below</div>
        </div>

        <form onSubmit={handleLogin}>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            required={true}
            onChange={handleChangeEmail}
          />

          <div className="mt-2 flex justify-end">
            <Button type="submit" loading={loading}>
              Send magic link
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
