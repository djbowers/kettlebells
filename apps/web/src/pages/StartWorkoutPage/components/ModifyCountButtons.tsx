import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';

interface ModifyCountButtonsProps {
  onChange: (value: number) => void;
  onClickMinus: () => void;
  onClickPlus: () => void;
  text: string;
  value: number;
}

export const ModifyCountButtons = ({
  onChange,
  onClickMinus,
  onClickPlus,
  text,
  value,
}: ModifyCountButtonsProps) => {
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(Number(e.target.value));

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="flex items-center justify-end">
        <Button size="icon" onClick={onClickMinus} aria-label={`- ${text}`}>
          <MinusIcon className="h-2.5 w-2.5" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center gap-1">
        <Input
          value={value}
          onChange={handleChangeValue}
          className="text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
        />
        <div className="text-foreground text-center text-sm">{text}</div>
      </div>
      <div className="flex items-center justify-start">
        <Button size="icon" onClick={onClickPlus} aria-label={`+ ${text}`}>
          <PlusIcon className="h-2.5 w-2.5" />
        </Button>
      </div>
    </div>
  );
};
