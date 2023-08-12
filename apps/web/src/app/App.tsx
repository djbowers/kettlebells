import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { Layout } from '~/components';

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
    <Layout>
      {!session ? (
        <Signup />
      ) : (
        <SessionProvider value={session}>
          <AuthenticatedRoutes key={session.user.id} />
        </SessionProvider>
      )}
    </Layout>
  );
}
