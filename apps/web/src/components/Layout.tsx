import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-w-screen min-h-screen bg-black text-white">
      {children}
    </div>
  );
};
