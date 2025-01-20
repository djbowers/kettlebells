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
    completedAt: new Date(workoutLog.completed_at),
    completedReps: workoutLog.completed_reps,
    completedRounds: workoutLog.completed_rounds,
    completedRungs: workoutLog.completed_rungs,
    id: workoutLog.id,
    intervalTimer: workoutLog.interval_timer,
    restTimer: workoutLog.rest_timer,
    rpe: workoutLog.rpe,
    startedAt: new Date(workoutLog.started_at),
    workoutDetails: workoutLog.workout_details,
    workoutGoal: workoutLog.workout_goal,
    workoutGoalUnits: workoutLog.workout_goal_units,
    workoutNotes: workoutLog.workout_notes,
  }));
};
