import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Account, History, Workout } from '../pages';
import { Page } from './Page';

export default function AuthenticatedRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Page />,
      children: [
        {
          path: '',
          element: <Workout />,
        },
        {
          path: 'account',
          element: <Account />,
        },
        {
          path: 'history',
          element: <History />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
