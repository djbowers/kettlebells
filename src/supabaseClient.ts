import { createClient } from '@supabase/supabase-js';

import { Database } from '../types/supabase';
import { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from './env';

// Determine the redirect URL based on the environment
const getRedirectUrl = () => {
  // Check if we're in standalone mode (PWA)
  const isStandalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone ||
    document.referrer.includes('android-app://');

  if (isStandalone) {
    // Use the custom protocol for PWA
    return 'bellskill://auth/callback';
  }

  // Use the regular URL for browser
  return `${window.location.origin}/auth`;
};

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      flowType: 'pkce',
    },
  },
);
