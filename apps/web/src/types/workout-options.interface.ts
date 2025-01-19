import { WorkoutGoalUnits } from './workout-goal-units.type';

export interface WorkoutOptions {
  bells: [number, number]; // kg
  intervalTimer: number; // seconds
  isOneHanded: boolean | null; // only applies to single kettlebell movements
  movements: string[];
  repScheme: number[];
  restTimer: number; // seconds
  startedAt?: Date;
  workoutDetails: string | null;
  workoutGoal: number; // minutes or rounds
  workoutGoalUnits: WorkoutGoalUnits;
}
