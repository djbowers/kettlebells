import clsx from 'clsx';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'large';
  kind?: 'primary' | 'outline';
  disabled?: boolean;
  [key: string]: any;
}

export const IconButton = ({
  children,
  className,
  kind = 'primary',
  size = 'default',
  disabled,
  ...props
}: Props) => {
  const classes = clsx(
    'flex items-center justify-center rounded-full shadow-md',
    {
      'h-4 w-4': size === 'default',
      'h-5 w-5': size === 'large',

      // button kind
      'bg-primary text-inverse': kind === 'primary',
      'border-layout text-default hover:bg-layout-darker border':
        kind === 'outline',
    },
    className,
  );

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
