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

import { Button, Input, Page } from '~/components';
import { WorkoutOptions } from '~/types';

interface Props {
  onStart?: (workoutOptions: WorkoutOptions) => void;
}

export const StartWorkoutPage = ({ onStart }: Props) => {
  const [movements, setMovements] = useState<string[]>(['']);
  const [minutes, setMinutes] = useState<number>(20);
  const [bells, setBells] = useState<[number, number]>([16, 0]);
  const [reps, setReps] = useState<number[]>([5]);
  const [notes, setNotes] = useState<string>('');

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
  const handleClickMinusRung: MouseEventHandler<HTMLButtonElement> = () => {
    if (reps.length > 1)
      setReps((prev) => {
        const reps = [...prev];
        reps.pop();
        return reps;
      });
  };
  const handleClickPlusRung: MouseEventHandler<HTMLButtonElement> = () => {
    setReps((prev) => {
      const last = prev[prev.length - 1];
      const reps = [...prev, last];
      return reps;
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
      reps,
      notes,
    };
    onStart?.(workoutOptions);
  };

  const unit = 'kg';
  const primaryBell = bells[0];
  const secondBell = bells[1];

  const doubleBells = secondBell > 0;

  const multipleMovements = movements.length > 1;
  const startDisabled = movements[0] === '' || primaryBell === 0;

  const movementsSectionTitle = 'Movement' + (multipleMovements ? 's' : '');
  const bellsSectionTitle = 'Bell' + (doubleBells ? 's' : '') + ` (${unit})`;

  return (
    <Page>
      <Section
        title={movementsSectionTitle}
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
          const movementNumber = index + 1;
          return (
            <div key={index} className="flex items-center gap-2">
              {multipleMovements && (
                <div className="text-default">{movementNumber}</div>
              )}
              <MovementInput
                index={index}
                value={movement}
                onChange={setMovements}
              />
            </div>
          );
        })}
      </Section>

      <Section title={bellsSectionTitle}>
        <div className="flex items-center justify-between gap-2">
          <Input
            type="number"
            value={primaryBell}
            onChange={handleChangePrimaryBell}
          />

          <Input
            type="number"
            value={secondBell}
            onChange={handleChangeSecondBell}
            disabled={!primaryBell}
          />
        </div>
      </Section>

      <Section title="Timer">
        <div className="mx-5 flex items-center justify-between">
          <div className="flex items-center">
            <Button
              onClick={handleDecrementTimer}
              kind="primary"
              className="h-4 w-4 rounded-full"
            >
              <MinusIcon className="h-3 w-3" />
            </Button>
          </div>
          <div className="grow">
            <div className="text-default text-center text-4xl">{minutes}</div>
            <div className="text-default text-center text-lg">min</div>
          </div>
          <div className="flex items-center">
            <Button
              onClick={handleIncrementTimer}
              kind="primary"
              className="h-4 w-4 rounded-full"
            >
              <PlusIcon className="h-2 w-2" />
            </Button>
          </div>
        </div>
      </Section>

      <Section
        title="Round"
        actions={
          <PlusMinusButtons
            count={reps.length}
            label="Rung"
            onClickMinus={handleClickMinusRung}
            onClickPlus={handleClickPlusRung}
          />
        }
      >
        {reps.map((_, index) => (
          <RepSchemePicker
            key={index}
            value={reps}
            onChange={setReps}
            index={index}
          />
        ))}
      </Section>

      <Section title="Workout Notes" flag="optional" bottomBorder={false}>
        <Input value={notes} onChange={handleChangeNotes} className="w-full" />
      </Section>

      <div className="flex justify-center">
        <Button
          className="h-5 w-full text-xl font-medium uppercase"
          kind="primary"
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

  const label =
    value.length === 1 ? 'reps / round' : `reps / rung ${index + 1}`;

  return (
    <div className="mx-5 flex justify-between">
      <div className="flex items-center">
        <Button
          onClick={handleDecrementReps}
          kind="primary"
          className="h-4 w-4 rounded-full"
        >
          <MinusIcon className="h-2 w-2" />
        </Button>
      </div>
      <div className="grow">
        <div className="text-default text-center text-4xl">{value[index]}</div>
        <div className="text-default text-center text-lg">{label}</div>
      </div>
      <div className="flex items-center">
        <Button
          onClick={handleIncrementReps}
          kind="primary"
          className="h-4 w-4 rounded-full"
        >
          <PlusIcon className="h-2 w-2" />
        </Button>
      </div>
    </div>
  );
};

const Section = ({
  actions = null,
  bottomBorder = true,
  children,
  flag,
  title,
}: {
  actions?: ReactNode;
  bottomBorder?: boolean;
  children: ReactNode;
  flag?: 'required' | 'optional';
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
          <div className="text-default text-base font-medium">
            {title}{' '}
            {flag === 'optional' && (
              <span className="text-subdued text-sm font-medium">
                (optional)
              </span>
            )}
          </div>
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
  onClickMinus,
  onClickPlus,
}: {
  count: number;
  label: string;
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
      <Button kind="outline" onClick={onClickPlus}>
        + {count === 1 && 'Additional'} {label}
      </Button>
    </div>
  );
};
