import clsx from 'clsx';
import { MouseEventHandler, ReactNode } from 'react';

import { Loading } from './Loading';

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  kind?: 'primary' | 'outline';
  leftIcon?: ReactNode;
  loading?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  size?: 'default' | 'large';
  [key: string]: any;
}

export const Button = ({
  children,
  className,
  kind = 'primary',
  leftIcon = null,
  loading = false,
  onClick,
  size = 'default',
  ...props
}: ButtonProps) => {
  const disabled = props.disabled || loading;

  const classes = clsx(
    'flex items-center justify-center rounded-full whitespace-nowrap text-left shadow-md',
    {
      // button size
      'text-sm h-4 px-1': size === 'default',
      'text-xl h-5 px-2': size === 'large',

      // button kind
      'bg-primary text-inverse': kind === 'primary',
      'border-layout text-default hover:bg-layout-darker border':
        kind === 'outline',

      // disabled states
      'cursor-pointer hover:bg-opacity-80': !disabled,
      'bg-opacity-50': kind === 'primary' && disabled,
      'bg-layout-darkest hover:bg-layout-darkest text-subdued':
        kind === 'outline' && disabled,
    },
    className,
  );

  return (
    <button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {leftIcon && <div className="mr-1">{leftIcon}</div>}
      {loading ? <Loading /> : children}
    </button>
  );
};
