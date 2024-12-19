import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

import { Button } from '~/components/ui/button';

export const ModifyCountButtons = ({
  onClickMinus,
  onClickPlus,
  text,
  value,
}: {
  onClickMinus: () => void;
  onClickPlus: () => void;
  text: string;
  value: ReactNode;
}) => {
  return (
    <div className="grid grid-cols-3">
      <div className="flex items-center justify-end">
        <Button size="icon" onClick={onClickMinus}>
          <MinusIcon className="h-2.5 w-2.5" />
        </Button>
      </div>
      <div className="text-foreground text-center">
        <div className="text-lg font-semibold">{value}</div>
        <div className="text-sm">{text}</div>
      </div>
      <div className="flex items-center justify-start">
        <Button size="icon" onClick={onClickPlus}>
          <PlusIcon className="h-2.5 w-2.5" />
        </Button>
      </div>
    </div>
  );
};
