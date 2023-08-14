import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Loading } from '../components';
import { supabase } from '../supabaseClient';

interface Workout {
  startedAt: string;
  completedAt: string;
  id: number;
  userId: string;
  task: string;
  notes: string | null;
  reps: number;
  minutes: number;
  completedRounds: number;
}

export const History = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);

  useEffect(() => {
    async function getTrainingHistory() {
      setLoading(true);

      let { data, error } = await supabase.from('workout_history').select(`*`);

      if (error) {
        console.warn(error);
      } else if (data) {
        setWorkoutHistory(
          data.map((workout) => ({
            startedAt: workout.started_at,
            completedAt: workout.completed_at,
            id: workout.id,
            userId: workout.user_id,
            task: workout.task,
            notes: workout.notes,
            reps: workout.reps_per_round,
            minutes: workout.minutes,
            completedRounds: workout.completed_rounds,
          })),
        );
      }

      setLoading(false);
    }

    getTrainingHistory();
  }, []);

  return (
    <div className="mt-2 flex flex-col space-y-2">
      {loading ? (
        <Loading />
      ) : (
        workoutHistory.map((workout) => (
          <div key={workout.id} className="w-full border rounded px-2 py-1">
            <div>
              {workout.minutes} Minutes -{' '}
              {DateTime.fromISO(workout.startedAt).toFormat('ccc LLL yy')}
            </div>
            <div>
              {workout.task}
              {workout.notes && ` - ${workout.notes}`}
            </div>
            <div>
              Completed {workout.completedRounds} rounds x {workout.reps} reps
              for a total of {workout.reps * workout.completedRounds} reps.
            </div>
          </div>
        ))
      )}
    </div>
  );
};
