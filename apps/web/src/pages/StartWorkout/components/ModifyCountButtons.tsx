import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';

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
    <Card>
      <div className="flex items-center justify-center gap-5 p-2">
        <div className="flex items-center">
          <Button size="icon" onClick={onClickMinus}>
            <MinusIcon className="h-2.5 w-2.5" />
          </Button>
        </div>
        <div className="text-foreground text-center">
          <div className="text-lg font-semibold">{value}</div>
          <div className="text-sm">{text}</div>
        </div>
        <div className="flex items-center">
          <Button size="icon" onClick={onClickPlus}>
            <PlusIcon className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
