import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '~/components';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { DEFAULT_WORKOUT_OPTIONS, useWorkoutOptions } from '~/contexts';
import { WorkoutGoalUnits, WorkoutOptions } from '~/types';

import {
  ModifyCountButtons,
  ModifyWorkoutButtons,
  MovementInput,
  RepSchemePicker,
  Section,
} from './components';

const DURATION_INCREMENT = 1; // minutes
const INTERVAL_TIMER_INCREMENT = 5; // seconds
const DEFAULT_INTERVAL_TIMER = 30; // seconds
const REST_TIMER_INCREMENT = 5; // seconds
const DEFAULT_REST_TIMER = 30; // seconds

export const StartWorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutOptions, updateWorkoutOptions] = useWorkoutOptions();

  const [bells, setBells] = useState<[number, number]>(workoutOptions.bells);
  const [workoutGoal, setWorkoutGoal] = useState<number>(
    workoutOptions.workoutGoal,
  );
  const [workoutGoalUnits, setWorkoutGoalUnits] = useState<WorkoutGoalUnits>(
    workoutOptions.workoutGoalUnits,
  );
  const [movements, setMovements] = useState<string[]>(
    workoutOptions.movements,
  );
  const [workoutDetails, setWorkoutDetails] = useState<string | null>(
    workoutOptions.workoutDetails,
  );
  const [repScheme, setRepScheme] = useState<number[]>(
    workoutOptions.repScheme,
  );
  const [intervalTimer, setIntervalTimer] = useState<number>(
    workoutOptions.intervalTimer,
  );
  const [restTimer, setRestTimer] = useState<number>(workoutOptions.restTimer);
  const [isOneHanded, setIsOneHanded] = useState<boolean | null>(
    workoutOptions.isOneHanded,
  );

  const movementsRef = useRef<Array<HTMLInputElement | null>>([]);
  const primaryBellRef = useRef<HTMLInputElement>(null);
  const secondBellRef = useRef<HTMLInputElement>(null);
  const detailsRef = useRef<HTMLInputElement>(null);

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
    setWorkoutGoal((prev) => prev + DURATION_INCREMENT);
  };
  const handleDecrementTimer = () => {
    setWorkoutGoal((prev) => {
      if (prev === 0) return prev;
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
  const handleToggleHands = () => {
    setIsOneHanded((prev) => !prev);
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
  const handleAddDetails = () => {
    setWorkoutDetails('');
  };
  const handleBlurDetails = () => {
    setWorkoutDetails(() => detailsRef.current?.value || null);
  };
  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      bells,
      intervalTimer,
      isOneHanded,
      movements,
      repScheme,
      restTimer,
      startedAt: new Date(),
      workoutDetails,
      workoutGoal,
      workoutGoalUnits,
    };
    updateWorkoutOptions(workoutOptions);
    navigate('active');
  };

  const primaryBell = bells[0];
  const secondBell = bells[1];

  useEffect(
    function handleUpdateIsOneHanded() {
      if (primaryBell === 0 && secondBell === 0) setIsOneHanded(null);
      if (primaryBell > 0 && secondBell > 0) setIsOneHanded(null);
      if (primaryBell > 0 && secondBell === 0 && isOneHanded === null)
        setIsOneHanded(DEFAULT_WORKOUT_OPTIONS.isOneHanded);
    },
    [bells],
  );

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
          <div className="flex items-center justify-center gap-2">
            {secondBell === 0 && (
              <Button variant="secondary" onClick={handleToggleHands}>
                {isOneHanded ? '1H' : '2H'}
              </Button>
            )}

            <div className="flex flex-col gap-1">
              {secondBell > 0 && <Label>Left</Label>}
              <span className="flex items-center gap-1">
                <Input
                  aria-label="Bell Input"
                  className="max-w-[100px]"
                  defaultValue={primaryBell}
                  min={0}
                  onBlur={handleBlurPrimaryBellInput}
                  ref={primaryBellRef}
                  type="number"
                />
                <span>kg</span>
              </span>
            </div>

            {secondBell > 0 && (
              <div className="flex flex-col gap-1">
                <Label>Right</Label>
                <span className="flex items-center gap-1">
                  <Input
                    aria-label="Bell Input"
                    className="max-w-[100px]"
                    defaultValue={secondBell}
                    disabled={!primaryBell}
                    min={0}
                    onBlur={handleBlurSecondBellInput}
                    ref={secondBellRef}
                    type="number"
                  />
                  <span>kg</span>
                </span>
              </div>
            )}
          </div>
        )}
      </Section>

      <Section
        title="Goal"
        actions={
          <Tabs
            value={workoutGoalUnits}
            onValueChange={(value) =>
              setWorkoutGoalUnits(value as WorkoutGoalUnits)
            }
          >
            <TabsList>
              <TabsTrigger size="sm" value="minutes">
                Duration
              </TabsTrigger>
              <TabsTrigger size="sm" value="rounds">
                Rounds
              </TabsTrigger>
            </TabsList>
          </Tabs>
        }
      >
        <ModifyCountButtons
          onClickMinus={handleDecrementTimer}
          onClickPlus={handleIncrementTimer}
          text={workoutGoalUnits}
          value={workoutGoal > 0 ? workoutGoal.toString() : <>&infin;</>}
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
        {workoutDetails === null ? (
          <Button variant="secondary" size="sm" onClick={handleAddDetails}>
            + Details
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

      {workoutDetails !== null && (
        <Section
          title="Workout Details"
          actions={
            workoutDetails?.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setWorkoutDetails(null)}
              >
                - Details
              </Button>
            )
          }
        >
          <Input
            autoFocus
            className="w-full"
            defaultValue={workoutDetails}
            onBlur={handleBlurDetails}
            ref={detailsRef}
          />
        </Section>
      )}
    </Page>
  );
};
