import { Button } from '~/components/ui/button';

export const ModifyWorkoutButtons = ({
  count,
  label,
  limit = 10,
  onClickMinus,
  onClickPlus,
}: {
  count: number;
  label: string;
  limit?: number;
  onClickMinus: () => void;
  onClickPlus: () => void;
}) => {
  return (
    <div className="flex items-center gap-2">
      {count > 1 && (
        <Button variant="secondary" size="sm" onClick={onClickMinus}>
          - {label}
        </Button>
      )}
      {count < limit && (
        <Button variant="secondary" size="sm" onClick={onClickPlus}>
          + {label}
        </Button>
      )}
    </div>
  );
};
