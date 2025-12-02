import { MovementOptions } from './movement-options.interface';
import { WorkoutGoalUnits } from './workout-goal-units.type';

export interface WorkoutOptions {
  intervalTimer: number; // seconds
  movements: MovementOptions[];
  restTimer: number; // seconds
  startedAt?: Date;
  workoutDetails: string | null;
  workoutGoal: number; // minutes, rounds, or target volume (kg)
  workoutGoalUnits: WorkoutGoalUnits;
  previousVolume?: number; // previous completed volume (kg) for volume goal calculations
  previousMinutes?: number; // actual completed duration in minutes from repeated workout
  previousRounds?: number; // actual completed rounds from repeated workout
}
