import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  kind?: 'primary' | 'outline';
  [key: string]: any;
}

export const Button = ({
  children,
  className,
  kind = 'primary',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex h-5 items-center justify-center whitespace-nowrap rounded px-3 text-left',
        {
          // button kind
          'bg-primary text-inverse cursor-pointer hover:bg-opacity-50':
            kind === 'primary',
          'border-layout text-default cursor-pointer hover:border-opacity-50':
            kind === 'outline',

          // disabled states
          'bg-disabled text-subdued cursor-default hover:border-opacity-100 hover:bg-opacity-100':
            props.disabled,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
