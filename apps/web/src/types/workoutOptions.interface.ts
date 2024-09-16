export interface WorkoutOptions {
  bells: [number, number]; // kg
  duration: number; // minutes
  intervalTimer: number; // seconds
  isOneHanded: boolean | null; // only applies to single kettlebell movements
  movements: string[];
  repScheme: number[];
  restTimer: number; // seconds
  workoutDetails: string | null;
}
