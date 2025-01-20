import { HttpResponse, http } from 'msw';

import { VITE_SUPABASE_URL } from '../env';
import { profiles } from './data';

const PROFILES_URL = `${VITE_SUPABASE_URL}/rest/v1/profiles`;

export const mockedProfilesGet = http.get(PROFILES_URL, async () => {
  return HttpResponse.json(profiles);
});

export const mockedProfilesPost = http.post(
  PROFILES_URL,
  async ({ request }) => {
    const body = await request.json();
    return HttpResponse.json(body);
  },
);

export default [mockedProfilesGet, mockedProfilesPost];
