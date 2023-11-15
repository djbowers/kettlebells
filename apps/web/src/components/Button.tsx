import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

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
        'flex h-5 items-center justify-center whitespace-nowrap rounded px-3 text-left',
        {
          'cursor-pointer': !props.disabled,

          // button kind
          'bg-primary text-inverse hover:bg-opacity-50':
            kind === 'primary' && !props.disabled,
          'border-layout text-default hover:bg-layout-darker border':
            kind === 'outline' && !props.disabled,

          // disabled states
          'text-subdued bg-opacity-50': props.disabled,
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
