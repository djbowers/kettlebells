import { Session } from '@supabase/supabase-js'
import { Account, TrainingHistory } from '../components'

interface Props {
  session: Session
}

export default function AuthenticatedApp({ session }: Props) {
  return (
    <>
      <Account session={session} />
      <TrainingHistory session={session} />
    </>
  )
}
