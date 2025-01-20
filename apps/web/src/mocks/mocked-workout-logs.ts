import { HttpResponse, http } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { workoutLogs } from './data';

const WORKOUT_LOGS_URL = `${VITE_SUPABASE_URL}/rest/v1/workout_logs`;

export const mockedWorkoutLogsGet = http.get(
  WORKOUT_LOGS_URL,
  ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (id) {
      const workoutLogId = id.split('.')[1];
      const workoutLog = workoutLogs.find((w) => w.id === Number(workoutLogId));

      if (!workoutLog) {
        throw new Error('Cannot find workout log with id: ' + id);
      }

      return HttpResponse.json([workoutLog]);
    }

    return HttpResponse.json(workoutLogs);
  },
);

export const mockedWorkoutLogsPatch = http.patch(
  WORKOUT_LOGS_URL,
  async ({ request }) => {
    const body = await request.json();
    if (!body || typeof body !== 'object') {
      throw new Error('Request body must be an object');
    }

    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    if (!id) {
      throw new Error('Must provide an ID');
    }

    const workoutLogId = id.split('.')[1];
    const workoutLog = workoutLogs.find((w) => w.id === Number(workoutLogId));
    if (!workoutLog) {
      throw new Error(`No workout log exists with id of ${id}`);
    }

    if ('rpe' in body) {
      workoutLog.rpe = body.rpe;
    }

    if ('workout_notes' in body) {
      workoutLog.workout_notes = body.workout_notes;
    }

    return HttpResponse.json();
  },
);

export const mockedWorkoutLogsPost = http.post(
  WORKOUT_LOGS_URL,
  async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body);
  },
);

export default [
  mockedWorkoutLogsGet,
  mockedWorkoutLogsPatch,
  mockedWorkoutLogsPost,
];
