import { useQuery } from 'react-query';

import { QUERIES } from '~/constants';
import { WorkoutLog } from '~/types';

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
  }));
};
