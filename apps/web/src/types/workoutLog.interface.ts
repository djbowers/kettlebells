import { RpeOptions } from './rpe.type';
import { WorkoutGoalUnits } from './workoutGoalUnits.type';

export interface WorkoutLog {
  bells: number[];
  completedAt: Date;
  completedReps: number;
  completedRounds: number;
  id: number;
  intervalTimer: number;
  isOneHanded: boolean | null;
  movements: string[];
  repScheme: number[];
  restTimer: number;
  rpe: RpeOptions | null;
  startedAt: Date;
  workoutDetails: string | null;
  workoutGoal: number;
  workoutGoalUnits: WorkoutGoalUnits;
  workoutNotes: string | null;
}
