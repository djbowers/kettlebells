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
      className={clsx('w-full text-left whitespace-nowrap', className)}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
