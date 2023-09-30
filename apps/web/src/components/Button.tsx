import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  [key: string]: any;
}

export const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'cursor-pointer whitespace-nowrap rounded text-left hover:text-blue-300',
        {
          'cursor-default bg-neutral-700 text-gray-300 hover:text-gray-300':
            disabled,
        },
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
