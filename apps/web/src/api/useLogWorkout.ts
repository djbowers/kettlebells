import { useMutation } from 'react-query';

import { useSession, useWorkoutOptions } from '~/contexts';
import { WorkoutOptions } from '~/types';

import { supabase } from '../supabaseClient';

export const useLogWorkout = (startedAt: Date) => {
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
        startedAt,
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
  startedAt,
  userId,
  workoutOptions,
}: {
  completedReps: number;
  completedRounds: number;
  completedRungs: number;
  startedAt: Date;
  userId: string;
  workoutOptions: WorkoutOptions;
}) => {
  const {
    bells,
    duration,
    intervalTimer,
    movements,
    notes,
    repScheme,
    restTimer,
  } = workoutOptions;

  const { error, data: workoutLogs } = await supabase
    .from('workout_logs')
    .insert({
      bells,
      completed_reps: completedReps,
      completed_rounds: completedRounds,
      completed_rungs: completedRungs,
      interval_timer: intervalTimer,
      minutes: duration,
      movements,
      notes,
      rep_scheme: repScheme,
      rest_timer: restTimer,
      started_at: startedAt.toISOString(),
      user_id: userId,
    })
    .select('id');

  if (error) {
    console.error(error);
    throw error;
  }

  return workoutLogs[0].id;
};
