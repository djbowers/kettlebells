import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  [key: string]: any;
}

export const Link = ({ children, ...props }: Props) => {
  return (
    <span className="text-action text-base font-medium" {...props}>
      {children}
    </span>
  );
};
