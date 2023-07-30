import { Session } from '@supabase/supabase-js';
import { Account, Start, TrainingHistory } from '../pages';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

interface Props {
  session: Session;
}

export default function AuthenticatedApp({ session }: Props) {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Start session={session} />,
    },
    {
      path: '/account',
      element: <Account session={session} />,
    },
    {
      path: '/history',
      element: <TrainingHistory session={session} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
