import clsx from 'clsx';
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';

interface Props {
  id?: string;
  label?: string;
  value?: InputHTMLAttributes<HTMLInputElement>['value'] | null;
  type?: HTMLInputTypeAttribute;
  className?: string;
  [key: string]: any;
}

export const Input = ({
  id,
  label,
  value,
  type = 'text',
  className,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        value={value || ''}
        type={type}
        className={clsx(
          'w-full bg-gray-600 border rounded-sm px-1 py-0.5 accent-yellow-400',
          className,
        )}
        {...props}
      />
    </div>
  );
};
