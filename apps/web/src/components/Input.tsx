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
    <>
      {label && (
        <label className="text-default" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        value={value || ''}
        onChange={onChange}
        type={type}
        className={clsx(
          'text-default w-full rounded',
          {
            'bg-layout-darker border-layout border px-1 py-0.5':
              !props.disabled,
            'bg-layout': props.disabled,
          },
          className,
        )}
        {...props}
      />
    </>
  );
};
