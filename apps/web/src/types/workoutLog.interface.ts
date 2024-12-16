import { RpeOptions } from './rpe.type';
import { WorkoutGoalUnits } from './workoutGoalUnits.type';

export interface WorkoutLog {
  bells: number[];
  completedReps: number;
  completedRounds: number;
  date: Date;
  id: number;
  intervalTimer: number;
  isOneHanded: boolean | null;
  movements: string[];
  repScheme: number[];
  restTimer: number;
  rpe: RpeOptions | null;
  workoutDetails: string | null;
  workoutGoal: number;
  workoutGoalUnits: WorkoutGoalUnits;
  workoutNotes: string | null;
}
