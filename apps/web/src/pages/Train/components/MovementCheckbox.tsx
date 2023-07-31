import { MouseEventHandler } from 'react';

import { Button, Input } from '~/components';

interface MovementProps {
  checked: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

export const MovementCheckbox = ({
  checked,
  onClick,
  label,
}: MovementProps) => {
  return (
    <Button
      className="flex items-center gap-1 border rounded-md px-1 py-0.5 hover:border-yellow-300"
      onClick={onClick}
    >
      <Input type="checkbox" checked={checked} readOnly={true} />
      <div className="text-center">{label}</div>
    </Button>
  );
};
