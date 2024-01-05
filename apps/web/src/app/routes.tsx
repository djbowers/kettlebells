import { RouteObject } from 'react-router-dom';

import {
  AccountPage,
  CompletedWorkoutPage,
  HistoryPage,
  Workout,
} from '../pages';
import { Root } from './Root';

export const routes: RouteObject[] = [
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
    ],
  },
];
