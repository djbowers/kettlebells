import { RpeOptions } from './rpe-options.type';
import { WorkoutGoalUnits } from './workout-goal-units.type';

export interface WorkoutLog {
  completedAt: Date;
  completedReps: number;
  completedRounds: number;
  completedRungs: number;
  id: number;
  intervalTimer: number;
  restTimer: number;
  rpe: RpeOptions | null;
  startedAt: Date;
  workoutDetails: string | null;
  workoutGoal: number;
  workoutGoalUnits: WorkoutGoalUnits;
  workoutNotes: string | null;
}
