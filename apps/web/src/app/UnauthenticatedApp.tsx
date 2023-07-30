import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UnauthenticatedApp() {
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
    <div className="">
      <div className="font-bold">Kettlebells</div>
      <div>Sign in via magic link with your email below</div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          required={true}
          onChange={handleChangeEmail}
        />

        <button disabled={loading}>
          {loading ? <span>Loading</span> : <span>Send magic link</span>}
        </button>
      </form>
    </div>
  );
}
