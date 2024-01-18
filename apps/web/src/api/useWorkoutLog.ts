import { useQuery } from 'react-query';

import { WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLog = (id: string) => {
  return useQuery('workoutLog', () => fetchWorkoutLog(id));
};

const fetchWorkoutLog = async (id: string): Promise<WorkoutLog> => {
  const { data: workoutLog, error } = await supabase
    .from('workout_logs')
    .select(`*`)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw error;
  }

  if (!workoutLog) {
    throw Error('Unable to fetch workout log data for id: ' + id);
  }

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
};
