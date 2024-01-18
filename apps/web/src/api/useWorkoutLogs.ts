import { useQuery } from 'react-query';

import { WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLogs = () => {
  return useQuery('workoutLogs', fetchWorkoutLogs);
};

const fetchWorkoutLogs = async (): Promise<WorkoutLog[]> => {
  const { data: workoutLogs, error } = await supabase
    .from('workout_logs')
    .select(`*`);

  if (error) {
    console.error(error);
    throw error;
  }

  return workoutLogs.map((workoutLog) => ({
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
  }));
};
