import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Loading, Page } from '~/components';
import { supabase } from '~/supabaseClient';

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

export const HistoryPage = () => {
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
    <Page>
      {loading ? (
        <Loading />
      ) : (
        workoutHistory.map((workout) => {
          const reps = workout.reps.join(', ');
          const repsPerRound = workout.reps.reduce(
            (prev, curr) => prev + curr,
            0,
          );
          const startedAt = DateTime.fromISO(workout.startedAt).toFormat(
            'ccc LLL dd',
          );

          return (
            <div
              key={workout.id}
              className="w-full rounded border px-2 py-1 text-white"
            >
              <div>
                {workout.minutes} Minutes - {startedAt}
              </div>
              <div>
                {workout.task}
                {workout.notes && ` - ${workout.notes}`}
              </div>
              <div>
                Completed {workout.completedRounds} rounds x {reps} reps for a
                total of {repsPerRound * workout.completedRounds} reps.
              </div>
            </div>
          );
        })
      )}
    </Page>
  );
};
