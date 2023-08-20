import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="h-full min-h-screen bg-black text-white flex flex-col items-center">
      <div className="max-w-2xl w-full grow">{children}</div>
    </div>
  );
};
