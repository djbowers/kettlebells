import clsx from 'clsx';
import { ReactNode } from 'react';

import { Loading } from './Loading';

interface Props {
  children: ReactNode;
  className?: string;
  kind?: 'primary' | 'outline';
  loading?: boolean;
  [key: string]: any;
}

export const Button = ({
  children,
  className,
  kind = 'primary',
  loading = false,
  ...props
}: Props) => {
  const disabled = props.disabled || loading;
  return (
    <button
      className={clsx(
        'flex items-center justify-center whitespace-nowrap rounded px-1 py-0.5 text-left text-sm shadow-md',
        {
          'cursor-pointer hover:bg-opacity-80': !disabled,

          // button kind
          'bg-primary text-inverse': kind === 'primary',
          'border-layout text-default hover:bg-layout-darker border':
            kind === 'outline',

          // disabled states
          'bg-opacity-50': kind === 'primary' && disabled,
          'bg-layout-darkest hover:bg-layout-darkest text-subdued':
            kind === 'outline' && disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
};
