import { createClient } from '@supabase/supabase-js'

import { Database } from '../types/supabase'
import { VITE_SUPABASE_ANON_KEY, VITE_SUPABASE_URL } from './env'

export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
)
