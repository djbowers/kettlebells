export interface WorkoutOptions {
  bells: [number, number]; // kg
  duration: number; // minutes
  intervalTimer: number; // seconds
  isOneHanded: boolean; // only applies to single kettlebell movements
  movements: string[];
  notes: string;
  repScheme: number[];
  restTimer: number; // seconds
}
