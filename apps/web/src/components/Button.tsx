import clsx from 'clsx';
import { ReactNode } from 'react';

import { Loading } from './Loading';

interface Props {
  leftIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  kind?: 'primary' | 'outline';
  size?: 'default' | 'large';
  loading?: boolean;
  [key: string]: any;
}

export const Button = ({
  leftIcon = null,
  children,
  className,
  kind = 'primary',
  size = 'default',
  loading = false,
  ...props
}: Props) => {
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
    <button className={classes} disabled={disabled} {...props}>
      {leftIcon && <div className="mr-1">{leftIcon}</div>}
      {loading ? <Loading /> : children}
    </button>
  );
};
