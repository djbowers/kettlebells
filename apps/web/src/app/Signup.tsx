import { Button, Input } from '../components';
import { supabase } from '../supabaseClient';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';

export default function Signup() {
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
    <div className="bg-gray-900 border rounded-lg p-2 flex flex-col gap-2">
      <div>
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

        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading' : 'Send magic link'}
          </Button>
        </div>
      </form>
    </div>
  );
}
