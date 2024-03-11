import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  ChangeEventHandler,
  Dispatch,
  ReactNode,
  SetStateAction,
  forwardRef,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '~/components';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
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

  const handleClickRemoveMovement = () => {
    if (movements.length > 1) {
      setMovements((prev) => {
        const movements = [...prev];
        movements.pop();
        return movements;
      });
    }
    movementsRef.current[movements.length - 2]?.focus();
  };
  const handleClickAddMovement = () => {
    setMovements((prev) =>
      prev[prev.length - 1] === '' ? prev : [...prev, ''],
    );
    movementsRef.current[movements.length - 1]?.focus();
  };
  const handleIncrementTimer = () => {
    setMinutes((prev) => prev + DURATION_INCREMENT);
  };
  const handleDecrementTimer = () => {
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
  const handleClickAddBell = () => {
    setBells((prev) => {
      const primaryBell = prev[0];
      if (primaryBell === 0) return DEFAULT_WORKOUT_OPTIONS.bells;
      else return [primaryBell, primaryBell];
    });
  };
  const handleClickRemoveBell = () => {
    setBells((prev) => [prev[0], 0]);
  };
  const handleClickBodyweightOnly = () => {
    setBells([0, 0]);
  };
  const handleClickMinusRung = () => {
    if (repScheme.length > 1)
      setRepScheme((prev) => {
        const rungs = [...prev];
        rungs.pop();
        return rungs;
      });
  };
  const handleClickPlusRung = () => {
    setRepScheme((prev) => {
      const last = prev[prev.length - 1];
      const rungs = [...prev, last];
      return rungs;
    });
  };
  const handleDecrementInterval = () => {
    setIntervalTimer((prev) =>
      prev > 0 ? prev - INTERVAL_TIMER_INCREMENT : 0,
    );
  };
  const handleIncrementInterval = () => {
    setIntervalTimer((prev) =>
      prev > 0 ? prev + INTERVAL_TIMER_INCREMENT : DEFAULT_INTERVAL_TIMER,
    );
  };
  const handleDecrementRest = () => {
    setRestTimer((prev) => (prev > 0 ? prev - REST_TIMER_INCREMENT : 0));
  };
  const handleIncrementRest = () => {
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
    <Page
      actions={
        <Button
          className="w-full"
          size="lg"
          onClick={handleClickStart}
          disabled={startDisabled}
        >
          Start workout
        </Button>
      }
    >
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
        title="Weights"
        actions={
          <div className="flex items-center gap-1">
            {primaryBell > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClickBodyweightOnly}
              >
                Bodyweight only
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
                <>
                  <Label>{secondBell ? 'Left' : undefined}</Label>
                  <span className="flex items-center gap-1">
                    <Input
                      aria-label="Bell Input"
                      defaultValue={primaryBell}
                      min={0}
                      onBlur={handleBlurPrimaryBellInput}
                      ref={primaryBellRef}
                      type="number"
                    />
                    <span>kg</span>
                  </span>
                </>
              )}
            </div>

            {secondBell > 0 && (
              <div className="flex basis-1/2 flex-col gap-1">
                <>
                  <Label>Right</Label>
                  <span className="flex items-center gap-1">
                    <Input
                      aria-label="Bell Input"
                      defaultValue={secondBell}
                      disabled={!primaryBell}
                      min={0}
                      onBlur={handleBlurSecondBellInput}
                      ref={secondBellRef}
                      type="number"
                    />
                    <span>kg</span>
                  </span>
                </>
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
          <Button
            variant="secondary"
            size="sm"
            onClick={handleIncrementInterval}
          >
            + Interval
          </Button>
        ) : (
          <div />
        )}
        {restTimer === 0 ? (
          <Button variant="secondary" size="sm" onClick={handleIncrementRest}>
            + Rest
          </Button>
        ) : (
          <div />
        )}
        {notes === undefined ? (
          <Button variant="secondary" size="sm" onClick={handleAddNotes}>
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIntervalTimer(0)}
              >
                - Interval
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRestTimer(0)}
              >
                - Rest
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
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setNotes(undefined)}
              >
                - Notes
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
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
  const handleIncrementReps = () => {
    onChange((prev) => {
      const reps = [...prev];
      reps[index] += 1;
      return reps;
    });
  };
  const handleDecrementReps = () => {
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
          <div className="text-foreground text-base font-medium">{title}</div>
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

const ModifyCountButtons = ({
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
