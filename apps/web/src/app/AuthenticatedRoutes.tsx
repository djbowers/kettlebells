import { Account, Start, TrainingHistory } from '../pages';
import { Root } from './Root';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export default function AuthenticatedRoutes() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      children: [
        {
          path: '',
          element: <Start />,
        },
        {
          path: 'account',
          element: <Account />,
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
