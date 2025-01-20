import { RpeOptions, WorkoutGoalUnits } from '~/types';

import { Database } from '../../types/supabase';

type WorkoutLog = Database['public']['Tables']['workout_logs']['Row'];

let id = 1;

export class ExampleWorkoutLog implements WorkoutLog {
  completed_at: string;
  completed_reps: number;
  completed_rounds: number;
  completed_rungs: number;
  completed_volume: number | null;
  id: number;
  interval_timer: number;
  movements: string[];
  rest_timer: number;
  rpe: RpeOptions | null;
  started_at: string;
  user_id: string;
  workout_details: string | null;
  workout_goal: number;
  workout_goal_units: WorkoutGoalUnits;
  workout_notes: string | null;

  bells: number[];
  is_one_handed: boolean | null;
  rep_scheme: number[];
  unit: string | null;

  constructor({
    bells = [],
    is_one_handed = null,
    rep_scheme = [],
    unit = null,

    completed_at = new Date().toISOString(),
    completed_reps = 0,
    completed_rounds = 0,
    completed_rungs = 0,
    completed_volume = 0,
    interval_timer = 0,
    movements = [],
    rest_timer = 0,
    rpe = 'ideal',
    started_at = new Date().toISOString(),
    user_id = '1',
    workout_details = '',
    workout_goal = 20,
    workout_goal_units = 'minutes',
    workout_notes = null,
  }: Partial<WorkoutLog>) {
    this.bells = bells;
    this.is_one_handed = is_one_handed;
    this.rep_scheme = rep_scheme;
    this.unit = unit;

    this.completed_at = completed_at;
    this.completed_reps = completed_reps;
    this.completed_rounds = completed_rounds;
    this.completed_rungs = completed_rungs;
    this.completed_volume = completed_volume;
    this.id = id;
    this.interval_timer = interval_timer;
    this.movements = movements;
    this.rest_timer = rest_timer;
    this.rpe = rpe;
    this.started_at = started_at;
    this.user_id = user_id;
    this.workout_details = workout_details;
    this.workout_goal = workout_goal;
    this.workout_goal_units = workout_goal_units;
    this.workout_notes = workout_notes;
    id++;
  }
}
