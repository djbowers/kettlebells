import { FC, ReactNode } from 'react';

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="min-w-screen bg-background text-foreground min-h-screen">
      {children}
    </div>
  );
};
