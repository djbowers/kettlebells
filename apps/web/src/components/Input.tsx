import clsx from 'clsx';
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';

interface Props {
  id?: string;
  label?: string;
  value: InputHTMLAttributes<HTMLInputElement>['value'] | null;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  [key: string]: any;
}

export const Input = ({
  id,
  label,
  value,
  onChange = () => {},
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
        onChange={onChange}
        type={type}
        className={clsx(
          'w-full rounded-sm bg-neutral-900 px-2 py-1',
          { 'bg-opacity-70': props.disabled },
          className,
        )}
        {...props}
      />
    </div>
  );
};