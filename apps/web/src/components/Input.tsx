import { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

interface Props {
  id: string;
  label?: string;
  value?: string | null;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
}

export const Input = ({
  id,
  label,
  value,
  onChange,
  disabled = false,
  type = 'text',
  placeholder,
  required = false,
}: Props) => {
  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value || ''}
        onChange={onChange}
        disabled={disabled}
        className="w-full bg-gray-600 border rounded-sm px-1 py-0.5 mb-0.5"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};
