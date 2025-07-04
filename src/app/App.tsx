import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Loading, PWAInstallPrompt } from '~/components';
import { WorkoutOptionsProvider } from '~/contexts/WorkoutOptionsContext';

import { SessionProvider } from '../contexts';
import { Signup } from '../pages';
import { supabase } from '../supabaseClient';
import '../tailwind.css';
import { routes } from './routes';

export function App() {
  const [session, setSession] = useState<Session | null | undefined>(undefined);

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
    <>
      {session === undefined && <Loading />}

      {session === null && <Signup />}

      {session && (
        <SessionProvider value={session}>
          <WorkoutOptionsProvider>
            <RouterProvider router={router} />
          </WorkoutOptionsProvider>
        </SessionProvider>
      )}
      
      <PWAInstallPrompt />
    </>
  );
}
