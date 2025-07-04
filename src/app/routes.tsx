import { RouteObject } from 'react-router-dom';

import { AuthHandler } from '../components/AuthHandler';
import {
  AccountPage,
  ActiveWorkoutPage,
  CompletedWorkoutPage,
  HistoryPage,
  MovementsPage,
  StartWorkoutPage,
} from '../pages';
import { Root } from './Root';

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthHandler />,
  },
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <StartWorkoutPage />,
      },
      {
        path: 'active',
        element: <ActiveWorkoutPage />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'history/:id',
        element: <CompletedWorkoutPage />,
      },
      {
        path: 'movements',
        element: <MovementsPage />,
      },
    ],
  },
];
