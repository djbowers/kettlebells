import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  ButtonProps,
  IconButton,
  Input,
  InputProps,
  Page,
} from '~/components';
import { DEFAULT_WORKOUT_OPTIONS, useWorkoutOptions } from '~/contexts';
import { WorkoutOptions } from '~/types';

const DURATION_INCREMENT = 1; // minutes
const INTERVAL_TIMER_INCREMENT = 5; // seconds
const DEFAULT_INTERVAL_TIMER = 30; // seconds
const REST_TIMER_INCREMENT = 5; // seconds
const DEFAULT_REST_TIMER = 30; // seconds

export const StartWorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutOptions, updateWorkoutOptions] = useWorkoutOptions();

  const [bells, setBells] = useState<[number, number]>(workoutOptions.bells);
  const [duration, setMinutes] = useState<number>(workoutOptions.duration);
  const [movements, setMovements] = useState<string[]>(
    workoutOptions.movements,
  );
  const [notes, setNotes] = useState<string | undefined>(
    workoutOptions.notes || undefined,
  );
  const [repScheme, setRepScheme] = useState<number[]>(
    workoutOptions.repScheme,
  );
  const [intervalTimer, setIntervalTimer] = useState<number>(
    workoutOptions.intervalTimer,
  );
  const [restTimer, setRestTimer] = useState<number>(workoutOptions.restTimer);

  const movementsRef = useRef<Array<HTMLInputElement | null>>([]);
  const primaryBellRef = useRef<HTMLInputElement>(null);
  const secondBellRef = useRef<HTMLInputElement>(null);
  const notesRef = useRef<HTMLInputElement>(null);

  const handleClickRemoveMovement: ButtonProps['onClick'] = () => {
    if (movements.length > 1) {
      setMovements((prev) => {
        const movements = [...prev];
        movements.pop();
        return movements;
      });
    }
    movementsRef.current[movements.length - 2]?.focus();
  };
  const handleClickAddMovement: ButtonProps['onClick'] = () => {
    setMovements((prev) =>
      prev[prev.length - 1] === '' ? prev : [...prev, ''],
    );
    movementsRef.current[movements.length - 1]?.focus();
  };
  const handleIncrementTimer: ButtonProps['onClick'] = () => {
    setMinutes((prev) => prev + DURATION_INCREMENT);
  };
  const handleDecrementTimer: ButtonProps['onClick'] = () => {
    setMinutes((prev) => {
      if (prev <= DURATION_INCREMENT) return prev;
      else return prev - DURATION_INCREMENT;
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
    setIntervalTimer((prev) =>
      prev > 0 ? prev - INTERVAL_TIMER_INCREMENT : 0,
    );
  };
  const handleIncrementInterval: ButtonProps['onClick'] = () => {
    setIntervalTimer((prev) =>
      prev > 0 ? prev + INTERVAL_TIMER_INCREMENT : DEFAULT_INTERVAL_TIMER,
    );
  };
  const handleDecrementRest: ButtonProps['onClick'] = () => {
    setRestTimer((prev) => (prev > 0 ? prev - REST_TIMER_INCREMENT : 0));
  };
  const handleIncrementRest: ButtonProps['onClick'] = () => {
    setRestTimer((prev) =>
      prev > 0 ? prev + REST_TIMER_INCREMENT : DEFAULT_REST_TIMER,
    );
  };
  const handleAddNotes = () => {
    setNotes('');
  };
  const handleBlurNotes = () => {
    setNotes(() => notesRef.current?.value || undefined);
  };
  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      bells,
      duration,
      intervalTimer,
      movements,
      notes: notes || '',
      repScheme,
      restTimer,
    };
    updateWorkoutOptions(workoutOptions);
    navigate('active');
  };

  const primaryBell = bells[0];
  const secondBell = bells[1];

  const startDisabled = movements[movements.length - 1] === '';

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
              ref={(el) => (movementsRef.current[index] = el)}
            />
          </div>
        ))}
      </Section>

      <Section
        title="Bell(s) (kg)"
        actions={
          <div className="flex items-center gap-1">
            {primaryBell > 0 && (
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
        }
      >
        {primaryBell > 0 && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex basis-1/2 flex-col gap-1">
              {primaryBell > 0 && (
                <Input
                  aria-label="Bell Input"
                  defaultValue={primaryBell}
                  label={secondBell ? 'Left' : undefined}
                  min={0}
                  onBlur={handleBlurPrimaryBellInput}
                  ref={primaryBellRef}
                  type="number"
                />
              )}
            </div>

            {secondBell > 0 && (
              <div className="flex basis-1/2 flex-col gap-1">
                <Input
                  aria-label="Bell Input"
                  defaultValue={secondBell}
                  disabled={!primaryBell}
                  label="Right"
                  min={0}
                  onBlur={handleBlurSecondBellInput}
                  ref={secondBellRef}
                  type="number"
                />
              </div>
            )}
          </div>
        )}
      </Section>

      <Section title="Timer">
        <ModifyCountButtons
          onClickMinus={handleDecrementTimer}
          onClickPlus={handleIncrementTimer}
          text="min"
          value={duration > 0 ? duration.toString() : <>&infin;</>}
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

      <div className="grid grid-cols-3 gap-2">
        {intervalTimer === 0 ? (
          <Button kind="outline" onClick={handleIncrementInterval}>
            + Interval
          </Button>
        ) : (
          <div />
        )}
        {restTimer === 0 ? (
          <Button kind="outline" onClick={handleIncrementRest}>
            + Rest
          </Button>
        ) : (
          <div />
        )}
        {notes === undefined ? (
          <Button kind="outline" onClick={handleAddNotes}>
            + Notes
          </Button>
        ) : (
          <div />
        )}
      </div>

      {intervalTimer > 0 && (
        <Section
          title="Interval Timer"
          actions={
            intervalTimer !== 0 && (
              <Button kind="outline" onClick={() => setIntervalTimer(0)}>
                - Interval Timer
              </Button>
            )
          }
        >
          <ModifyCountButtons
            onClickMinus={handleDecrementInterval}
            onClickPlus={handleIncrementInterval}
            text="sec"
            value={intervalTimer.toString()}
          />
        </Section>
      )}

      {restTimer > 0 && (
        <Section
          title="Rest Timer"
          actions={
            restTimer !== 0 && (
              <Button kind="outline" onClick={() => setRestTimer(0)}>
                - Rest Timer
              </Button>
            )
          }
        >
          <ModifyCountButtons
            onClickMinus={handleDecrementRest}
            onClickPlus={handleIncrementRest}
            text="sec"
            value={restTimer.toString()}
          />
        </Section>
      )}

      {notes !== undefined && (
        <Section
          title="Workout Notes"
          actions={
            notes?.length > 0 && (
              <Button kind="outline" onClick={() => setNotes(undefined)}>
                - Workout Notes
              </Button>
            )
          }
        >
          <Input
            autoFocus
            className="w-full"
            defaultValue={notes}
            onBlur={handleBlurNotes}
            ref={notesRef}
          />
        </Section>
      )}

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

const MovementInput = forwardRef<
  HTMLInputElement,
  {
    onChange: Dispatch<SetStateAction<string[]>>;
    value: string;
    index: number;
  }
>(({ onChange, value, index }, ref) => {
  const handleChange: InputProps['onChange'] = (e) => {
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
  children,
  title,
}: {
  actions?: ReactNode;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div className="layout flex flex-col gap-y-1">
      <div className="flex items-center gap-x-1">
        <div className="flex w-full items-center justify-between">
          <div className="text-default text-base font-medium">{title}</div>
          {actions}
        </div>
      </div>
      {children && <div className="flex flex-col gap-y-2">{children}</div>}
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
          + {label}
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
  value: ReactNode;
}) => {
  return (
    <div className="flex items-center justify-center gap-5">
      <div className="flex items-center">
        <IconButton onClick={onClickMinus}>
          <MinusIcon className="h-2.5 w-2.5" />
        </IconButton>
      </div>
      <div className="text-default text-center">
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
