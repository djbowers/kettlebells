import { RpeOptions } from './rpe.type';

export interface WorkoutLog {
  bells: number[];
  completedReps: number;
  completedRounds: number;
  date: Date;
  duration: number;
  id: number;
  intervalTimer: number;
  movements: string[];
  notes: string | null;
  repScheme: number[];
  restTimer: number;
  rpe: RpeOptions | null;
}
