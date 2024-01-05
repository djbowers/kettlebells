import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '~/components';

import { SessionProvider } from '../contexts';
import { Signup } from '../pages';
import { supabase } from '../supabaseClient';
import '../tailwind.css';
import { routes } from './routes';

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

  const router = createBrowserRouter(routes);

  return (
    <Layout>
      {!session ? (
        <Signup />
      ) : (
        <SessionProvider value={session}>
          <RouterProvider router={router} />
        </SessionProvider>
      )}
    </Layout>
  );
}
