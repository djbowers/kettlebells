import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Account, Exercises, StartSession, TrainingHistory } from '../pages';
import { Root } from './Root';

export default function AuthenticatedRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <StartSession />,
        },
        {
          path: 'account',
          element: <Account />,
        },
        {
          path: 'exercises',
          element: <Exercises />,
        },
        {
          path: 'history',
          element: <TrainingHistory />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
