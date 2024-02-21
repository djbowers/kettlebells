export interface WorkoutOptions {
  bells: [number, number]; // kg
  duration: number; // minutes
  intervalTimer: number; // seconds
  movements: string[];
  notes: string;
  repScheme: number[];
  restTimer: number; // seconds
}
