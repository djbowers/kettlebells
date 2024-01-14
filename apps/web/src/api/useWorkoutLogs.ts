import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    async function getWorkoutLogs() {
      setLoading(true);

      const { data: workoutLogs, error } = await supabase
        .from('workout_logs')
        .select(`*`);

      if (error) {
        setError(error);
        console.error(error);
      } else if (workoutLogs) {
        setWorkoutLogs(
          workoutLogs.map((workoutLog) => {
            return {
              bells: workoutLog.bells,
              completedReps: workoutLog.completed_reps,
              completedRounds: workoutLog.completed_rounds,
              date: new Date(workoutLog.started_at),
              duration: workoutLog.minutes,
              id: workoutLog.id,
              notes: workoutLog.notes,
              repScheme: workoutLog.rep_scheme,
              movements: workoutLog.movements,
              rpe: workoutLog.rpe,
            };
          }),
        );
      }

      setLoading(false);
    }

    getWorkoutLogs();
  }, []);

  return { data: workoutLogs, loading, error };
};
