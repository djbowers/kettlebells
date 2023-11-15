import { FC, ReactNode } from 'react';

export const Page: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto max-w-xl">
      <div className="flex flex-row flex-wrap">
        <main
          role="main"
          className="mb-5 mt-4 flex w-full flex-col gap-3 px-3 text-white"
        >
          {children}
        </main>
      </div>
    </div>
  );
};
