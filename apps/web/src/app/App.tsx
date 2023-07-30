import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import UnauthenticatedApp from './UnauthenticatedApp'
import AuthenticatedApp from './AuthenticatedApp'
import { Session } from '@supabase/supabase-js'

import '../tailwind.css'

function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="w-full min-h-screen p-7">
      {!session ? (
        <UnauthenticatedApp />
      ) : (
        <AuthenticatedApp key={session.user.id} session={session} />
      )}
    </div>
  )
}

export default App
