import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  forwardRef,
} from 'react';

import { Input } from '~/components/ui/input';

export const MovementInput = forwardRef<
  HTMLInputElement,
  {
    onChange: Dispatch<SetStateAction<string[]>>;
    value: string;
    index: number;
  }
>(({ onChange, value, index }, ref) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange((prev) => {
      const movements = [...prev];
      movements[index] = e.target.value;
      return movements;
    });
  };

  return (
    <Input
      autoFocus
      aria-label="Movement Input"
      value={value}
      onChange={handleChange}
      className="w-full"
      id="movement"
      ref={ref}
    />
  );
});
