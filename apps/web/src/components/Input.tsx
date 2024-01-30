import clsx from 'clsx';
import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  forwardRef,
} from 'react';

export interface InputProps {
  className?: string;
  id?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  type?: HTMLInputTypeAttribute;
  value?: InputHTMLAttributes<HTMLInputElement>['value'];
  [key: string]: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, label, onChange, type = 'text', value, ...props }, ref) => {
    return (
      <>
        {label && (
          <label className="text-default" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          value={value}
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
          ref={ref}
          {...props}
        />
      </>
    );
  },
);
