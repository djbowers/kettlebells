import { DateTime } from 'luxon';

export const practices = [
  {
    id: 1,
    task: 'Clean and Press',
    minutes: 30,
    reps: [1, 2, 3, 4, 5],
    started_at: DateTime.now().minus({ hour: 1 }).toISO(),
    completed_at: DateTime.now().toISO(),
    user_id: 1,
    notes: 'The Giant Week 1 Day 1',
    completed_rounds: 2,
  },
  {
    id: 2,
    task: 'Snatch',
    minutes: 20,
    reps: [9],
    started_at: DateTime.now().minus({ hour: 1 }).toISO(),
    completed_at: DateTime.now().toISO(),
    user_id: 1,
    notes: 'King Sized Killer Phase 1 Week 1 Day 1',
    completed_rounds: 2,
  },
];
