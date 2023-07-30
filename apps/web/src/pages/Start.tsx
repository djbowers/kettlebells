import { Session } from '@supabase/supabase-js';

interface Props {
  session: Session;
}

export const Start = ({ session }: Props) => {
  return (
    <div className="w-full text-white">
      <div className="text-xl">Let's get started!</div>

      <div></div>
    </div>
  );
};
