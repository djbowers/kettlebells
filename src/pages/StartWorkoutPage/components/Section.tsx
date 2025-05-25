import { ReactNode } from 'react';

import { CardContent, CardHeader, CardTitle } from '~/components/ui/card';

export const Section = ({
  actions = null,
  children,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <>
      <CardHeader>
        <div className="flex w-full items-center justify-between gap-x-1">
          <CardTitle>{title}</CardTitle>
          {actions}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">{children}</CardContent>
    </>
  );
};
