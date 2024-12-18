import { useMutation } from 'react-query';

import { useSession, useWorkoutOptions } from '~/contexts';
import { WorkoutOptions } from '~/types';

import { supabase } from '../supabaseClient';

export const useLogWorkout = () => {
  const [workoutOptions] = useWorkoutOptions();
  const { user } = useSession();

  return useMutation({
    mutationFn: ({
      completedReps,
      completedRounds,
      completedRungs,
    }: {
      completedReps: number;
      completedRounds: number;
      completedRungs: number;
    }) => {
      return logWorkout({
        completedReps,
        completedRounds,
        completedRungs,
        userId: user.id,
        workoutOptions,
      });
    },
  });
};

const logWorkout = async ({
  completedReps,
  completedRounds,
  completedRungs,
  userId,
  workoutOptions,
}: {
  completedReps: number;
  completedRounds: number;
  completedRungs: number;
  userId: string;
  workoutOptions: WorkoutOptions;
}) => {
  const {
    bells,
    intervalTimer,
    isOneHanded,
    movements,
    repScheme,
    restTimer,
    startedAt,
    workoutDetails,
    workoutGoal,
    workoutGoalUnits,
  } = workoutOptions;

  const { error, data: workoutLogs } = await supabase
    .from('workout_logs')
    .insert({
      bells,
      completed_reps: completedReps,
      completed_rounds: completedRounds,
      completed_rungs: completedRungs,
      interval_timer: intervalTimer,
      is_one_handed: isOneHanded,
      movements,
      rep_scheme: repScheme,
      rest_timer: restTimer,
      started_at: startedAt.toISOString(),
      user_id: userId,
      workout_details: workoutDetails,
      workout_goal: workoutGoal,
      workout_goal_units: workoutGoalUnits,
    })
    .select('id');

  if (error) {
    console.error(error);
    throw error;
  }

  return workoutLogs[0].id;
};
