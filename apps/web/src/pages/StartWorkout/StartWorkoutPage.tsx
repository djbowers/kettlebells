import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import {
  ChangeEventHandler,
  Dispatch,
  MouseEventHandler,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

import { Button, IconButton, Input, Page } from '~/components';
import { WorkoutOptions } from '~/types';

interface Props {
  onStart?: (workoutOptions: WorkoutOptions) => void;
}

export const StartWorkoutPage = ({ onStart }: Props) => {
  const [movements, setMovements] = useState<string[]>(['']);
  const [minutes, setMinutes] = useState<number>(20);
  const [bells, setBells] = useState<[number, number]>([16, 0]);
  const [rungs, setRungs] = useState<number[]>([5]);
  const [notes, setNotes] = useState<string>('');

  const [showNotes, setShowNotes] = useState<boolean>(false);

  const handleClickRemoveMovement: MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (movements.length > 1)
      setMovements((prev) => {
        const movements = [...prev];
        movements.pop();
        return movements;
      });
  };
  const handleClickAddMovement: MouseEventHandler<HTMLButtonElement> = () => {
    setMovements((prev) => [...prev, '']);
  };
  const handleIncrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => (prev += 5));
  };
  const handleDecrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 5);
    });
  };
  const handleChangePrimaryBell: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setBells((prev) => {
      if (prev[1] > 0) return [newWeight, prev[1]];
      return [newWeight, 0];
    });
  };
  const handleChangeSecondBell: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setBells((prev) => {
      if (newWeight > 0) return [prev[0], newWeight];
      return [prev[0], 0];
    });
  };
  const handleClickAddBell: MouseEventHandler<HTMLButtonElement> = () => {
    setBells((prev) => {
      const primaryBell = prev[0];
      return [primaryBell, primaryBell];
    });
  };
  const handleClickRemoveBell: MouseEventHandler<HTMLButtonElement> = () => {
    setBells((prev) => {
      return [prev[0], 0];
    });
  };
  const handleClickMinusRung: MouseEventHandler<HTMLButtonElement> = () => {
    if (rungs.length > 1)
      setRungs((prev) => {
        const rungs = [...prev];
        rungs.pop();
        return rungs;
      });
  };
  const handleClickPlusRung: MouseEventHandler<HTMLButtonElement> = () => {
    setRungs((prev) => {
      const last = prev[prev.length - 1];
      const rungs = [...prev, last];
      return rungs;
    });
  };
  const handleChangeNotes: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNotes(e.target.value);
  };

  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      tasks: movements,
      minutes,
      bells,
      reps: rungs,
      notes,
    };
    onStart?.(workoutOptions);
  };

  const primaryBell = bells[0];
  const secondBell = bells[1];

  const startDisabled = movements[0] === '' || primaryBell === 0;

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
            <Input
              label={secondBell ? 'L' : undefined}
              className="w-[100px]"
              onChange={handleChangePrimaryBell}
              type="number"
              value={primaryBell}
            />
          </div>

          {secondBell && (
            <div className="flex items-center gap-1">
              <Input
                label="R"
                className="w-[100px]"
                disabled={!primaryBell}
                onChange={handleChangeSecondBell}
                type="number"
                value={secondBell}
              />
            </div>
          )}

          <PlusMinusButtons
            count={secondBell > 0 ? 2 : 1}
            label="Bell"
            limit={2}
            onClickMinus={handleClickRemoveBell}
            onClickPlus={handleClickAddBell}
          />
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
            <div className="text-4xl">{minutes}</div>
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
            count={rungs.length}
            label="Rung"
            onClickMinus={handleClickMinusRung}
            onClickPlus={handleClickPlusRung}
          />
        }
      >
        {rungs.map((_, index) => (
          <RepSchemePicker
            key={index}
            value={rungs}
            onChange={setRungs}
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
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
  const handleIncrementReps: MouseEventHandler<HTMLButtonElement> = () => {
    onChange((prev) => {
      const reps = [...prev];
      reps[index] += 1;
      return reps;
    });
  };
  const handleDecrementReps: MouseEventHandler<HTMLButtonElement> = () => {
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
  onClickMinus: MouseEventHandler<HTMLButtonElement>;
  onClickPlus: MouseEventHandler<HTMLButtonElement>;
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
          + {count === 1 && 'Additional'} {label}
        </Button>
      )}
    </div>
  );
};
