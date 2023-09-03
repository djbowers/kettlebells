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
  reps: number[];
  minutes: number;
  completedRounds: number;
}

export const History = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);

  useEffect(() => {
    async function getTrainingHistory() {
      setLoading(true);

      let { data, error } = await supabase.from('practices').select(`*`);

      if (error) {
        console.warn(error);
      } else if (data) {
        setWorkoutHistory(
          data.map((workout) => {
            return {
              startedAt: workout.started_at,
              completedAt: workout.completed_at,
              id: workout.id,
              userId: workout.user_id,
              task: workout.task,
              notes: workout.notes,
              reps: workout.reps,
              minutes: workout.minutes,
              completedRounds: workout.completed_rounds,
            };
          }),
        );
      }

      setLoading(false);
    }

    getTrainingHistory();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        workoutHistory.map((workout) => (
          <div key={workout.id} className="w-full rounded border px-2 py-1">
            <div>
              {workout.minutes} Minutes -{' '}
              {DateTime.fromISO(workout.startedAt).toFormat('ccc LLL dd')}
            </div>
            <div>
              {workout.task}
              {workout.notes && ` - ${workout.notes}`}
            </div>
            <div>
              Completed {workout.completedRounds} rounds x {workout.reps[0]}{' '}
              reps for a total of {workout.reps[0] * workout.completedRounds}{' '}
              reps.
            </div>
          </div>
        ))
      )}
    </>
  );
};
