import { useQuery } from 'react-query';

import { QUERIES, WorkoutLog } from '~/types';

import { supabase } from '../supabaseClient';

export const useWorkoutLog = (id: string) => {
  return useQuery(QUERIES.WORKOUT_LOG, () => fetchWorkoutLog(id));
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
    completedAt: new Date(workoutLog.completed_at),
    completedReps: workoutLog.completed_reps,
    completedRounds: workoutLog.completed_rounds,
    id: workoutLog.id,
    intervalTimer: workoutLog.interval_timer,
    isOneHanded: workoutLog.is_one_handed,
    movements: workoutLog.movements,
    repScheme: workoutLog.rep_scheme,
    restTimer: workoutLog.rest_timer,
    rpe: workoutLog.rpe,
    startedAt: new Date(workoutLog.started_at),
    workoutDetails: workoutLog.workout_details,
    workoutGoal: workoutLog.workout_goal,
    workoutGoalUnits: workoutLog.workout_goal_units,
    workoutNotes: workoutLog.workout_notes,
  };
};
