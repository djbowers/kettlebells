import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="min-w-screen bg-layout min-h-screen">{children}</div>;
};
