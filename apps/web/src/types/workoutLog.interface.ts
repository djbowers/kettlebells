export interface WorkoutLog {
  bells: number[];
  completedReps: number;
  completedRounds: number;
  date: Date;
  duration: number;
  id: number;
  movements: string[];
  notes: string | null;
  repScheme: number[];
  rpe: 'noEffort' | 'easy' | 'ideal' | 'hard' | 'maxEffort' | null;
}
