import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { SessionProvider } from '../contexts';
import { supabase } from '../supabaseClient';
import '../tailwind.css';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import Signup from './Signup';

export function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-5">
      {!session ? (
        <Signup />
      ) : (
        <SessionProvider value={session}>
          <AuthenticatedRoutes key={session.user.id} />
        </SessionProvider>
      )}
    </div>
  );
}
