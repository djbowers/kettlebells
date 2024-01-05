import { FC, ReactNode } from 'react';

export const Page: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-xl">
      <div className="flex flex-row flex-wrap">
        <main
          role="main"
          className="text-default mb-5 mt-2 flex w-full flex-col gap-2 px-3"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
