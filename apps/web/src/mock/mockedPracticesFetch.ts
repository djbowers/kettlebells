import { rest } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { practices } from './data';

export const mockedPracticesFetch = rest.all(
  `${VITE_SUPABASE_URL}/rest/v1/practices`,
  async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(practices));
      default:
        return res(ctx.json('Unhandled method'));
    }
  },
);
