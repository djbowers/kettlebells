import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Loading, Page } from '~/components';
import { supabase } from '~/supabaseClient';

interface Workout {
  startedAt: string;
  completedAt: string;
  id: number;
  userId: string;
  tasks: string[];
  notes: string | null;
  reps: number[];
  minutes: number;
  completedRounds: number;
  completedRungs: number;
  completedReps: number;
}

export const HistoryPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workoutHistory, setWorkoutHistory] = useState<Workout[]>([]);

  useEffect(() => {
    async function getTrainingHistory() {
      setLoading(true);

      let { data, error } = await supabase.from('workout_logs').select(`*`);

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
              tasks: workout.tasks,
              notes: workout.notes,
              reps: workout.reps,
              minutes: workout.minutes,
              completedRounds: workout.completed_rounds,
              completedRungs: workout.completed_rungs,
              completedReps: workout.completed_reps,
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
          const startedAt = DateTime.fromISO(workout.startedAt).toFormat(
            'ccc LLL dd',
          );

          return (
            <div
              key={workout.id}
              className="text-default border-layout w-full rounded border px-2 py-1"
            >
              <div>
                {startedAt} - {workout.minutes} Minutes
              </div>
              <div>
                {workout.tasks[0]}
                {workout.notes && ` - ${workout.notes}`}
              </div>
              <div>Reps / Round: {reps}</div>
              <div>
                Completed {workout.completedRounds} rounds,{' '}
                {workout.completedRungs} rungs, and {workout.completedReps}{' '}
                reps.
              </div>
            </div>
          );
        })
      )}
    </Page>
  );
};
