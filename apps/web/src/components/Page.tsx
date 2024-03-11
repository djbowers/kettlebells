import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface Props {
  children: ReactNode;
  title?: ReactNode;
  actions?: ReactNode;
}

export const Page = ({ children, title = null, actions = null }: Props) => {
  return (
    <Card className="md:border-border mx-auto max-w-lg border-transparent shadow-none md:my-2 md:shadow-xl">
      {title && (
        <CardHeader>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent
        className={clsx('flex flex-col gap-2', { 'pt-2': title === null })}
      >
        {children}
      </CardContent>
      {actions && <CardFooter className="justify-end">{actions}</CardFooter>}
    </Card>
  );
};
