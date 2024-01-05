export interface WorkoutLog {
  bells: number[];
  completedReps: number;
  completedRounds: number;
  date: Date;
  duration: number;
  id: number;
  notes: string | null;
  repScheme: number[];
  tasks: string[];
}
