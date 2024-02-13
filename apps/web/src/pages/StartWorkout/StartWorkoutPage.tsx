import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';

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
  const [bells, setBells] = useState<[number, number]>(
    DEFAULT_WORKOUT_OPTIONS.bells,
  );
  const [duration, setMinutes] = useState<number>(
    DEFAULT_WORKOUT_OPTIONS.duration,
  );
  const [movements, setMovements] = useState<string[]>(
    DEFAULT_WORKOUT_OPTIONS.movements,
  );
  const [notes, setNotes] = useState<string>(DEFAULT_WORKOUT_OPTIONS.notes);
  const [repScheme, setRepScheme] = useState<number[]>(
    DEFAULT_WORKOUT_OPTIONS.repScheme,
  );
  const [intervalTimer, setIntervalTimer] = useState<number>(
    DEFAULT_WORKOUT_OPTIONS.intervalTimer,
  );

  const [showNotes, setShowNotes] = useState<boolean>(false);

  const primaryBellRef = useRef<HTMLInputElement>(null);
  const secondBellRef = useRef<HTMLInputElement>(null);

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
  const handleBlurPrimaryBellInput = () => {
    setBells((prev) => [Number(primaryBellRef.current?.value), prev[1]]);
  };
  const handleBlurSecondBellInput = () => {
    setBells((prev) => [prev[0], Number(secondBellRef.current?.value)]);
  };
  const handleClickAddBell: ButtonProps['onClick'] = () => {
    setBells((prev) => {
      const primaryBell = prev[0];
      if (primaryBell === 0) return DEFAULT_WORKOUT_OPTIONS.bells;
      else return [primaryBell, primaryBell];
    });
  };
  const handleClickRemoveBell: ButtonProps['onClick'] = () => {
    setBells((prev) => [prev[0], 0]);
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
  const handleDecrementInterval: ButtonProps['onClick'] = () => {
    setIntervalTimer((prev) => (prev > 0 ? prev - 0.25 : 0));
  };
  const handleIncrementInterval: ButtonProps['onClick'] = () => {
    setIntervalTimer((prev) => (prev > 0 ? prev + 0.25 : 1));
  };
  const handleChangeNotes: InputProps['onChange'] = (e) => {
    setNotes(e.target.value);
  };
  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      bells,
      duration,
      intervalTimer,
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
          <ModifyWorkoutButtons
            count={movements.length}
            label="Movement"
            onClickMinus={handleClickRemoveMovement}
            onClickPlus={handleClickAddMovement}
          />
        }
      >
        {movements.map((movement, index) => (
          <div key={index} className="flex items-center gap-2">
            <MovementInput
              index={index}
              value={movement}
              onChange={setMovements}
            />
          </div>
        ))}
      </Section>

      <Section title="Bell(s) (kg)">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            {primaryBell > 0 && (
              <Input
                aria-label="Bell Input"
                defaultValue={primaryBell}
                label={secondBell ? 'L' : undefined}
                min={0}
                onBlur={handleBlurPrimaryBellInput}
                ref={primaryBellRef}
                type="number"
              />
            )}
          </div>

          {secondBell > 0 && (
            <div className="flex items-center gap-1">
              <Input
                aria-label="Bell Input"
                defaultValue={secondBell}
                disabled={!primaryBell}
                label="R"
                min={0}
                onBlur={handleBlurSecondBellInput}
                ref={secondBellRef}
                type="number"
              />
            </div>
          )}

          <div className="flex items-center gap-1">
            {primaryBell > 0 && secondBell === 0 && (
              <Button kind="outline" onClick={handleClickBodyweightOnly}>
                Bodyweight Only
              </Button>
            )}

            <ModifyWorkoutButtons
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
        <ModifyCountButtons
          onClickMinus={handleDecrementTimer}
          onClickPlus={handleIncrementTimer}
          text="min"
          value={duration.toString()}
        />
      </Section>

      <Section
        title="Rep Scheme"
        actions={
          <ModifyWorkoutButtons
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
        title="Interval Timer"
        actions={
          intervalTimer === 0 && (
            <Button kind="outline" onClick={handleIncrementInterval}>
              + Add Interval Timer
            </Button>
          )
        }
      >
        {intervalTimer > 0 && (
          <ModifyCountButtons
            onClickMinus={handleDecrementInterval}
            onClickPlus={handleIncrementInterval}
            text="sec"
            value={(intervalTimer * 60).toString()}
          />
        )}
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
    <ModifyCountButtons
      onClickMinus={handleDecrementReps}
      onClickPlus={handleIncrementReps}
      text="reps"
      value={value[index].toString()}
    />
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

const ModifyWorkoutButtons = ({
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

const ModifyCountButtons = ({
  onClickMinus,
  onClickPlus,
  text,
  value,
}: {
  onClickMinus: ButtonProps['onClick'];
  onClickPlus: ButtonProps['onClick'];
  text: string;
  value: string;
}) => {
  return (
    <div className="mx-5 flex items-center justify-between">
      <div className="flex items-center">
        <IconButton onClick={onClickMinus}>
          <MinusIcon className="h-2.5 w-2.5" />
        </IconButton>
      </div>
      <div className="text-default grow text-center">
        <div className="text-4xl">{value}</div>
        <div className="text-base">{text}</div>
      </div>
      <div className="flex items-center">
        <IconButton onClick={onClickPlus}>
          <PlusIcon className="h-2.5 w-2.5" />
        </IconButton>
      </div>
    </div>
  );
};

export const DEFAULT_WORKOUT_OPTIONS: WorkoutOptions = {
  bells: [16, 0],
  duration: 20,
  movements: [''],
  notes: '',
  repScheme: [5],
  intervalTimer: 0,
};
