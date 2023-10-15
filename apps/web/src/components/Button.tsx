import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  [key: string]: any;
}

export const Button = ({
  children,
  className,
  onClick,
  type = 'button',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'whitespace-nowrap rounded text-left',
        {
          'cursor-pointer hover:text-blue-300': !props.disabled,
          'cursor-default bg-neutral-700 text-gray-300 hover:text-gray-300':
            props.disabled,
        },
        className,
      )}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
