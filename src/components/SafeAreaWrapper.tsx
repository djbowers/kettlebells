import { ReactNode } from 'react';

interface SafeAreaWrapperProps {
  children: ReactNode;
}

export const SafeAreaWrapper = ({ children }: SafeAreaWrapperProps) => {
  return (
    <div className="safe-area-top safe-area-bottom safe-area-left safe-area-right min-h-screen">
      {children}
    </div>
  );
};
