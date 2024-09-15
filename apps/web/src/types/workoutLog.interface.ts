import { RpeOptions } from './rpe.type';

export interface WorkoutLog {
  bells: number[];
  completedReps: number;
  completedRounds: number;
  date: Date;
  duration: number;
  id: number;
  intervalTimer: number;
  isOneHanded: boolean | null;
  movements: string[];
  repScheme: number[];
  restTimer: number;
  rpe: RpeOptions | null;
  workoutDetails: string | null;
  workoutNotes: string | null;
}
