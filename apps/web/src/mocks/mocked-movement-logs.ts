import { HttpResponse, http } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { movementLogs } from './data';

const MOVEMENT_LOGS_URL = `${VITE_SUPABASE_URL}/rest/v1/movement_logs`;

export const mockedMovementLogsGet = http.get(
  MOVEMENT_LOGS_URL,
  ({ request }) => {
    const url = new URL(request.url);
    const workoutLogId = url.searchParams.get('workout_log_id')?.split('.')[1];

    const filteredMovementLogs = movementLogs.filter(
      (m) => m.workout_log_id === Number(workoutLogId),
    );

    if (filteredMovementLogs.length === 0) {
      throw new Error(
        'Cannot find movement logs with workout_log_id: ' + workoutLogId,
      );
    }

    return HttpResponse.json(filteredMovementLogs);
  },
);

export default [mockedMovementLogsGet];
