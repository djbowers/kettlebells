import { DateTime } from 'luxon';

export const profiles = [
  {
    username: 'Luke Skywalker',
    id: 1,
  },
];

export const workoutLogs = [
  {
    id: 1,
    tasks: ['Clean and Press'],
    minutes: 30,
    reps: [1, 2, 3, 4, 5],
    bells: [16, 16],
    started_at: DateTime.now().minus({ hour: 1 }).toISO(),
    completed_at: DateTime.now().toISO(),
    user_id: 1,
    notes: 'The Giant Week 1 Day 1',
    completed_rounds: 4,
    completed_rungs: 20,
    completed_reps: 60,
  },
  {
    id: 2,
    tasks: ['Snatch'],
    minutes: 10,
    reps: [9],
    bells: [16],
    started_at: DateTime.now().minus({ hour: 1 }).toISO(),
    completed_at: DateTime.now().toISO(),
    user_id: 1,
    notes: 'King Sized Killer Phase 1 Week 1 Day 1',
    completed_rounds: 2,
    completed_rungs: 2,
    completed_reps: 36,
  },
];
