import { PostgrestError } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import { WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLog = (id?: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<PostgrestError | null>(null);
  const [workoutLog, setWorkoutLog] = useState<WorkoutLog | null>(null);

  useEffect(() => {
    async function getWorkoutLogs() {
      setLoading(true);

      const { data: workoutLog, error } = await supabase
        .from('workout_logs')
        .select(`*`)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        setError(error);
        console.error(error);
      } else if (workoutLog) {
        setWorkoutLog({
          bells: workoutLog.bells,
          completedReps: workoutLog.completed_reps,
          completedRounds: workoutLog.completed_rounds,
          date: new Date(workoutLog.started_at),
          duration: workoutLog.minutes,
          id: workoutLog.id,
          notes: workoutLog.notes,
          repScheme: workoutLog.reps,
          tasks: workoutLog.tasks,
        });
      }

      setLoading(false);
    }

    getWorkoutLogs();
  }, []);

  return { data: workoutLog, loading, error };
};
