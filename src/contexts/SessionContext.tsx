import { Session } from '@supabase/supabase-js';
import { createContext, useContext } from 'react';

export const SessionContext = createContext<Session>(undefined!);
export const SessionProvider = SessionContext.Provider;
export const useSession = () => useContext(SessionContext);
