import { rest } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { profiles } from './data';

export const mockedProfilesFetch = rest.all(
  `${VITE_SUPABASE_URL}/rest/v1/profiles`,
  async (req, res, ctx) => {
    switch (req.method) {
      case 'GET':
        return res(ctx.json(profiles));
      case 'POST':
        const body = await req.json();
        return res(ctx.json(body));
      default:
        return res(ctx.json('Unhandled method'));
    }
  },
);
