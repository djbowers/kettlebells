import { HttpResponse, http } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { workoutLogs } from './data';

const WORKOUT_LOGS_URL = `${VITE_SUPABASE_URL}/rest/v1/workout_logs`;

export const mockedWorkoutLogsGet = http.get(
  WORKOUT_LOGS_URL,
  ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) return;
    return HttpResponse.json(workoutLogs);
  },
);

export const mockedWorkoutLogGet = http.get(WORKOUT_LOGS_URL, ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const workoutLogId = id.split('.')[1];
    return HttpResponse.json(
      workoutLogs.find((w) => w.id === Number(workoutLogId)),
    );
  }
});

export const mockedWorkoutLogsPost = http.post(
  WORKOUT_LOGS_URL,
  async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body);
  },
);

export default [
  mockedWorkoutLogGet,
  mockedWorkoutLogsGet,
  mockedWorkoutLogsPost,
];
