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
      <div className="flex w-full max-w-sm flex-col gap-2 p-3">
        <div className="text-default text-center text-lg font-bold">
          Log in to BellSkill
        </div>

        <form onSubmit={handleLogin} className="space-y-2">
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address..."
            value={email}
            required={true}
            onChange={handleChangeEmail}
            className="h-5"
          />

          <Button type="submit" loading={loading} className="h-5 w-full">
            Continue with Email
          </Button>
        </form>
      </div>
    </div>
  );
}
