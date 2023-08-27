import { FC, ReactNode } from 'react';

export const Page: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="flex flex-row flex-wrap">
        <main role="main" className="my-5 flex w-full flex-col gap-3 px-3">
          {children}
        </main>
      </div>
    </div>
  );
};