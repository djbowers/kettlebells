import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';

import {
  Button,
  ButtonProps,
  IconButton,
  Input,
  InputProps,
  Page,
} from '~/components';
import { WorkoutOptions } from '~/types';

interface Props {
  onStart?: (workoutOptions: WorkoutOptions) => void;
}

export const StartWorkoutPage = ({ onStart }: Props) => {
  const [bells, setBells] = useState<[number, number]>([DEFAULT_WEIGHT, 0]);
  const [duration, setMinutes] = useState<number>(20);
  const [movements, setMovements] = useState<string[]>(['']);
  const [notes, setNotes] = useState<string>('');
  const [repScheme, setRepScheme] = useState<number[]>([5]);

  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleClickRemoveMovement: ButtonProps['onClick'] = () => {
    if (movements.length > 1)
      setMovements((prev) => {
        const movements = [...prev];
        movements.pop();
        return movements;
      });
  };
  const handleClickAddMovement: ButtonProps['onClick'] = () => {
    setMovements((prev) => [...prev, '']);
  };
  const handleIncrementTimer: ButtonProps['onClick'] = () => {
    setMinutes((prev) => (prev += 5));
  };
  const handleDecrementTimer: ButtonProps['onClick'] = () => {
    setMinutes((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 5);
    });
  };
  const handleChangePrimaryBell: InputProps['onChange'] = (e) => {
    setBells((prev) => [Number(e.target.value), prev[1]]);
  };
  const handleChangeSecondBell: InputProps['onChange'] = (e) => {
    setBells((prev) => [prev[0], Number(e.target.value)]);
  };
  const handleClickAddBell: ButtonProps['onClick'] = () => {
    setBells((prev) => {
      const primaryBell = prev[0];
      if (primaryBell === 0) return [DEFAULT_WEIGHT, 0];
      else return [primaryBell, primaryBell];
    });
  };
  const handleClickRemoveBell: ButtonProps['onClick'] = () => {
    setBells((prev) => {
      return [prev[0], 0];
    });
  };
  const handleClickBodyweightOnly: ButtonProps['onClick'] = () => {
    setBells([0, 0]);
  };
  const handleClickMinusRung: ButtonProps['onClick'] = () => {
    if (repScheme.length > 1)
      setRepScheme((prev) => {
        const rungs = [...prev];
        rungs.pop();
        return rungs;
      });
  };
  const handleClickPlusRung: ButtonProps['onClick'] = () => {
    setRepScheme((prev) => {
      const last = prev[prev.length - 1];
      const rungs = [...prev, last];
      return rungs;
    });
  };
  const handleChangeNotes: InputProps['onChange'] = (e) => {
    setNotes(e.target.value);
  };

  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      bells,
      duration,
      movements,
      notes,
      repScheme,
    };
    onStart?.(workoutOptions);
  };

  const primaryBell = bells[0];
  const secondBell = bells[1];

  const startDisabled = movements[0] === '';

  return (
    <Page>
      <Section
        title="Movement(s)"
        actions={
          <PlusMinusButtons
            count={movements.length}
            label="Movement"
            onClickMinus={handleClickRemoveMovement}
            onClickPlus={handleClickAddMovement}
          />
        }
      >
        {movements.map((movement, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <MovementInput
                index={index}
                value={movement}
                onChange={setMovements}
              />
            </div>
          );
        })}
      </Section>

      <Section title="Bell(s) (kg)">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {primaryBell > 0 && (
              <Input
                aria-label="Bell Input"
                label={secondBell ? 'L' : undefined}
                min={0}
                onChange={handleChangePrimaryBell}
                type="number"
                value={primaryBell}
              />
            )}
          </div>

          {secondBell > 0 && (
            <div className="flex items-center gap-1">
              <Input
                aria-label="Bell Input"
                disabled={!primaryBell}
                label="R"
                min={0}
                onChange={handleChangeSecondBell}
                type="number"
                value={secondBell}
              />
            </div>
          )}

          <div className="flex items-center gap-1">
            {primaryBell > 0 && secondBell === 0 && (
              <Button kind="outline" onClick={handleClickBodyweightOnly}>
                Bodyweight Only
              </Button>
            )}

            <PlusMinusButtons
              count={secondBell > 0 ? 2 : 1}
              label="Bell"
              limit={2}
              onClickMinus={handleClickRemoveBell}
              onClickPlus={handleClickAddBell}
            />
          </div>
        </div>
      </Section>

      <Section title="Timer">
        <div className="mx-5 flex items-center justify-between">
          <div className="flex items-center">
            <IconButton onClick={handleDecrementTimer}>
              <MinusIcon className="h-2.5 w-2.5" />
            </IconButton>
          </div>
          <div className="text-default grow text-center">
            <div className="text-4xl">{duration}</div>
            <div className="text-base">min</div>
          </div>
          <div className="flex items-center">
            <IconButton onClick={handleIncrementTimer}>
              <PlusIcon className="h-2.5 w-2.5" />
            </IconButton>
          </div>
        </div>
      </Section>

      <Section
        title="Round"
        actions={
          <PlusMinusButtons
            count={repScheme.length}
            label="Rung"
            onClickMinus={handleClickMinusRung}
            onClickPlus={handleClickPlusRung}
          />
        }
      >
        {repScheme.map((_, index) => (
          <RepSchemePicker
            key={index}
            value={repScheme}
            onChange={setRepScheme}
            index={index}
          />
        ))}
      </Section>

      <Section
        title={showNotes ? 'Workout Notes' : undefined}
        bottomBorder={false}
        actions={
          !showNotes && (
            <Button
              kind="outline"
              className="ml-auto"
              onClick={() => setShowNotes(true)}
            >
              + Workout Notes
            </Button>
          )
        }
      >
        {showNotes && (
          <Input
            value={notes}
            onChange={handleChangeNotes}
            className="w-full"
          />
        )}
      </Section>

      <div className="flex justify-center">
        <Button
          className="w-full font-medium uppercase"
          size="large"
          onClick={handleClickStart}
          disabled={startDisabled}
        >
          Start
        </Button>
      </div>
    </Page>
  );
};

const MovementInput = ({
  onChange,
  value,
  index,
}: {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string;
  index: number;
}) => {
  const handleChange: InputProps['onChange'] = (e) => {
    onChange((prev) => {
      const movements = [...prev];
      movements[index] = e.target.value;
      return movements;
    });
  };

  return (
    <Input
      aria-label="Movement Input"
      value={value}
      onChange={handleChange}
      className="w-full"
      id="movement"
    />
  );
};

const RepSchemePicker = ({
  onChange,
  value,
  index,
}: {
  onChange: Dispatch<SetStateAction<number[]>>;
  value: number[];
  index: number;
}) => {
  const handleIncrementReps: ButtonProps['onClick'] = () => {
    onChange((prev) => {
      const reps = [...prev];
      reps[index] += 1;
      return reps;
    });
  };
  const handleDecrementReps: ButtonProps['onClick'] = () => {
    onChange((prev) => {
      const reps = [...prev];
      if (reps[index] <= 1) return reps;
      reps[index] -= 1;
      return reps;
    });
  };

  return (
    <div className="mx-5 flex justify-between">
      <div className="flex items-center">
        <IconButton onClick={handleDecrementReps}>
          <MinusIcon className="h-2.5 w-2.5" />
        </IconButton>
      </div>
      <div className="text-default grow text-center">
        <div className="text-4xl">{value[index]}</div>
        <div className="text-base">reps</div>
      </div>
      <div className="flex items-center">
        <IconButton onClick={handleIncrementReps}>
          <PlusIcon className="h-2.5 w-2.5" />
        </IconButton>
      </div>
    </div>
  );
};

const Section = ({
  actions = null,
  bottomBorder = true,
  children,
  title,
}: {
  actions?: ReactNode;
  bottomBorder?: boolean;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div
      className={clsx('layout flex flex-col space-y-1 pb-2', {
        'border-b': bottomBorder,
      })}
    >
      <div className="flex items-center space-x-1">
        <div className="flex w-full items-center justify-between">
          <div className="text-default text-base font-medium">{title}</div>
          {actions}
        </div>
      </div>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
};

const PlusMinusButtons = ({
  count,
  label,
  limit = 10,
  onClickMinus,
  onClickPlus,
}: {
  count: number;
  label: string;
  limit?: number;
  onClickMinus: ButtonProps['onClick'];
  onClickPlus: ButtonProps['onClick'];
}) => {
  return (
    <div className="flex items-center gap-2">
      {count > 1 && (
        <Button kind="outline" onClick={onClickMinus}>
          - {label}
        </Button>
      )}
      {count < limit && (
        <Button kind="outline" onClick={onClickPlus}>
          + {count === 1 && 'Add'} {label}
        </Button>
      )}
    </div>
  );
};

const DEFAULT_WEIGHT = 16;
