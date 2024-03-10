import { FC, ReactNode } from 'react';

import { Card, CardContent, CardTitle } from './ui/card';

interface Props {
  children: ReactNode;
  title?: ReactNode;
}

export const Page = ({ children, title }: Props) => {
  return (
    <Card className="md:border-border container my-4 h-full max-w-xl border-transparent shadow-none md:shadow-xl">
      {title && <CardTitle className="my-2 text-xl">{title}</CardTitle>}
      <CardContent className="my-3 flex flex-col gap-3">{children}</CardContent>
    </Card>
  );
};
