import { MovementOptions } from './movement-options.interface';
import { WorkoutGoalUnits } from './workout-goal-units.type';

export interface WorkoutOptions {
  intervalTimer: number; // seconds
  movements: MovementOptions[];
  restTimer: number; // seconds
  startedAt?: Date;
  workoutDetails: string | null;
  workoutGoal: number; // minutes or rounds
  workoutGoalUnits: WorkoutGoalUnits;
}
