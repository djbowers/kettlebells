import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className,
}: Props) => {
  return (
    <button
      className={clsx(
        'text-left whitespace-nowrap hover:text-blue-300 cursor-pointer',
        {
          'bg-neutral-700 text-gray-300 hover:text-gray-300 cursor-default':
            disabled,
        },
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
