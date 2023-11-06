import { rest } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { workoutLogs } from './data';

export const mockedWorkoutLogsFetch = rest.all(
  `${VITE_SUPABASE_URL}/rest/v1/workout_logs`,
  async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(workoutLogs));
      case 'POST':
        const body = await req.json();
        return res(ctx.json(body));
      default:
        return res(ctx.json('Unhandled method'));
    }
  },
);
