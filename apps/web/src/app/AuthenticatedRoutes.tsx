import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Account, HistoryPage, Workout } from '../pages';
import { Root } from './Root';

export default function AuthenticatedRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
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
          element: <HistoryPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
