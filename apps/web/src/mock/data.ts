import { DateTime } from 'luxon';

export const practices = [
  {
    id: 1,
    task: 'Clean and Press',
    minutes: 20,
    reps: [1],
    started_at: DateTime.now().minus({ hour: 1 }).toISO(),
    completed_at: DateTime.now().toISO(),
    user_id: 1,
    notes: 'This is a test',
    completed_rounds: 2,
  },
];
