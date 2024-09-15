import { useQuery } from 'react-query';

import { QUERIES, WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLogs = () => {
  return useQuery(QUERIES.WORKOUT_LOGS, fetchWorkoutLogs);
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
    intervalTimer: workoutLog.interval_timer,
    isOneHanded: workoutLog.is_one_handed,
    movements: workoutLog.movements,
    repScheme: workoutLog.rep_scheme,
    restTimer: workoutLog.rest_timer,
    rpe: workoutLog.rpe,
    workoutDetails: workoutLog.workout_details,
    workoutNotes: workoutLog.workout_notes,
  }));
};
