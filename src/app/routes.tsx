import { RouteObject } from 'react-router-dom';

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
