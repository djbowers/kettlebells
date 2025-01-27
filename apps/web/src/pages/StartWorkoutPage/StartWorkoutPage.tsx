import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Page } from '~/components';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { DEFAULT_MOVEMENT_OPTIONS, useWorkoutOptions } from '~/contexts';
import {
  MovementOptions,
  WeightUnit,
  WorkoutGoalUnits,
  WorkoutOptions,
} from '~/types';

import {
  ModifyCountButtons,
  ModifyWorkoutButtons,
  Section,
} from './components';

const DEFAULT_INTERVAL_TIMER: number = 30; // seconds
const DEFAULT_REST_TIMER: number = 30; // seconds
const DEFAULT_WEIGHT_UNIT: WeightUnit =
  DEFAULT_MOVEMENT_OPTIONS.weightOneUnit ?? 'kilograms';
const DEFAULT_WEIGHT_VALUE: number =
  DEFAULT_MOVEMENT_OPTIONS.weightOneValue ?? 16;

const INCREMENT_DURATION: number = 1; // minutes
const INCREMENT_INTERVAL_TIMER: number = 5; // seconds
const INCREMENT_REST_TIMER: number = 5; // seconds

export const StartWorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutOptions, updateWorkoutOptions] = useWorkoutOptions();

  const [workoutGoal, setWorkoutGoal] = useState<number>(
    workoutOptions.workoutGoal,
  );
  const [workoutGoalUnits, setWorkoutGoalUnits] = useState<WorkoutGoalUnits>(
    workoutOptions.workoutGoalUnits,
  );
  const [movements, setMovements] = useState<MovementOptions[]>(
    workoutOptions.movements,
  );
  const [workoutDetails, setWorkoutDetails] = useState<string | null>(
    workoutOptions.workoutDetails,
  );
  const [intervalTimer, setIntervalTimer] = useState<number>(
    workoutOptions.intervalTimer,
  );
  const [restTimer, setRestTimer] = useState<number>(workoutOptions.restTimer);

  const detailsRef = useRef<HTMLInputElement>(null);

  const handleIncrementGoalValue = () =>
    setWorkoutGoal((prev) => prev + INCREMENT_DURATION);

  const handleDecrementGoalValue = () =>
    setWorkoutGoal((prev) => (prev === 0 ? prev : prev - INCREMENT_DURATION));

  const handleDecrementInterval = () =>
    setIntervalTimer((prev) =>
      prev > 0 ? prev - INCREMENT_INTERVAL_TIMER : 0,
    );

  const handleIncrementInterval = () =>
    setIntervalTimer((prev) =>
      prev > 0 ? prev + INCREMENT_INTERVAL_TIMER : DEFAULT_INTERVAL_TIMER,
    );

  const handleDecrementRest = () =>
    setRestTimer((prev) => (prev > 0 ? prev - INCREMENT_REST_TIMER : 0));

  const handleIncrementRest = () =>
    setRestTimer((prev) =>
      prev > 0 ? prev + INCREMENT_REST_TIMER : DEFAULT_REST_TIMER,
    );

  const handleAddDetails = () => setWorkoutDetails('');

  const handleBlurDetails = () =>
    setWorkoutDetails(() => detailsRef.current?.value || null);

  const handleChangeMovementName = (index: number, value: string) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index ? { ...movement, movementName: value } : movement,
      ),
    );

  const handleClickRemoveMovement = (index: number) =>
    setMovements((prev) => prev.filter((_, i) => i !== index));

  const handleClickAddMovement = () =>
    setMovements((prev) => [...prev, DEFAULT_MOVEMENT_OPTIONS]);

  const handleChangeWeightTab = (index: number, value: string) => {
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index
          ? {
              ...movement,
              weightOneValue:
                value === 'none'
                  ? null
                  : movement.weightOneValue || DEFAULT_WEIGHT_VALUE,
              weightOneUnit: value === 'none' ? null : DEFAULT_WEIGHT_UNIT,
              weightTwoValue:
                value === 'double'
                  ? movement.weightTwoValue || DEFAULT_WEIGHT_VALUE
                  : value === '1h'
                  ? 0
                  : null,
              weightTwoUnit: value === 'double' ? DEFAULT_WEIGHT_UNIT : null,
            }
          : movement,
      ),
    );
  };

  const handleChangeWeightOneValue = (index: number, value: number) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index
          ? {
              ...movement,
              weightOneValue: Math.max(1, value),
            }
          : movement,
      ),
    );

  const handleChangeWeightTwoValue = (index: number, value: number) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index
          ? {
              ...movement,
              weightTwoValue: Math.max(1, value),
            }
          : movement,
      ),
    );

  const handleChangeRepScheme = (
    movementIndex: number,
    rungIndex: number,
    value: number,
  ) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === movementIndex
          ? {
              ...movement,
              repScheme: movement.repScheme.map((rung, j) =>
                j === rungIndex ? Math.max(1, value) : rung,
              ),
            }
          : movement,
      ),
    );

  const handleClickMinusRung = (index: number) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index
          ? {
              ...movement,
              repScheme: movement.repScheme.slice(0, -1),
            }
          : movement,
      ),
    );

  const handleClickPlusRung = (index: number) =>
    setMovements((prev) =>
      prev.map((movement, i) =>
        i === index
          ? {
              ...movement,
              repScheme: [
                ...movement.repScheme,
                movement.repScheme.length > 0
                  ? movement.repScheme[movement.repScheme.length - 1]
                  : 1,
              ],
            }
          : movement,
      ),
    );

  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      intervalTimer,
      movements,
      restTimer,
      startedAt: new Date(),
      workoutDetails,
      workoutGoal,
      workoutGoalUnits,
    };
    updateWorkoutOptions(workoutOptions);
    navigate('active');
  };

  const isDifferentRepSchemes =
    movements.length > 1 &&
    movements.some(
      (movement) => movement.repScheme.length !== movements[0].repScheme.length,
    );

  const startDisabled =
    movements.length === 0 ||
    movements.some((movement) => movement.movementName.length === 0) ||
    isDifferentRepSchemes;

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
      <Card>
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
            onClickMinus={handleDecrementGoalValue}
            onClickPlus={handleIncrementGoalValue}
            onChange={setWorkoutGoal}
            text={workoutGoalUnits}
            value={workoutGoal}
          />
        </Section>
      </Card>

      {(workoutDetails === null || intervalTimer === 0 || restTimer === 0) && (
        <div className="flex gap-2">
          {workoutDetails === null && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddDetails}
              className="grow"
            >
              + Details
            </Button>
          )}
          {intervalTimer === 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleIncrementInterval}
              className="grow"
            >
              + Interval
            </Button>
          )}
          {restTimer === 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleIncrementRest}
              className="grow"
            >
              + Rest
            </Button>
          )}
        </div>
      )}

      {workoutDetails !== null && (
        <Card>
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
        </Card>
      )}

      {intervalTimer > 0 && (
        <Card>
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
              value={intervalTimer}
              onChange={setIntervalTimer}
            />
          </Section>
        </Card>
      )}

      {restTimer > 0 && (
        <Card>
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
              value={restTimer}
              onChange={setRestTimer}
            />
          </Section>
        </Card>
      )}

      {movements.map((movement, index) => {
        const weightTabValue =
          movement.weightOneValue === null
            ? 'none'
            : movement.weightTwoValue === null
            ? '2h'
            : movement.weightTwoValue === 0
            ? '1h'
            : 'double';

        return (
          <Card key={index}>
            <Section
              title={`Movement #${index + 1}`}
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleClickRemoveMovement(index)}
                >
                  - Movement
                </Button>
              }
            >
              <Input
                autoFocus
                aria-label="Movement Input"
                value={movement.movementName}
                onChange={(e) =>
                  handleChangeMovementName(index, e.target.value)
                }
                className="w-full"
                id="movement"
              />
            </Section>
            <Section
              title="Weights"
              actions={
                <Tabs
                  value={weightTabValue}
                  onValueChange={(value) => handleChangeWeightTab(index, value)}
                >
                  <TabsList>
                    <TabsTrigger size="sm" value="none">
                      None
                    </TabsTrigger>
                    <TabsTrigger size="sm" value="2h">
                      2H
                    </TabsTrigger>
                    <TabsTrigger size="sm" value="1h">
                      1H
                    </TabsTrigger>
                    <TabsTrigger size="sm" value="double">
                      Double
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              }
            >
              {movement.weightOneValue !== null && (
                <ModifyCountButtons
                  onClickMinus={() =>
                    handleChangeWeightOneValue(
                      index,
                      movement.weightOneValue! - 1,
                    )
                  }
                  onClickPlus={() =>
                    handleChangeWeightOneValue(
                      index,
                      movement.weightOneValue! + 1,
                    )
                  }
                  text={
                    movement.weightOneUnit === 'kilograms'
                      ? 'kg'
                      : movement.weightOneUnit === 'pounds'
                      ? 'lbs'
                      : ''
                  }
                  value={movement.weightOneValue}
                  onChange={(value) =>
                    handleChangeWeightOneValue(index, value!)
                  }
                />
              )}
              {movement.weightTwoValue !== null &&
                movement.weightTwoValue > 0 && (
                  <ModifyCountButtons
                    onClickMinus={() =>
                      handleChangeWeightTwoValue(
                        index,
                        movement.weightTwoValue! - 1,
                      )
                    }
                    onClickPlus={() =>
                      handleChangeWeightTwoValue(
                        index,
                        movement.weightTwoValue! + 1,
                      )
                    }
                    text={
                      movement.weightTwoUnit === 'kilograms'
                        ? 'kg'
                        : movement.weightTwoUnit === 'pounds'
                        ? 'lbs'
                        : ''
                    }
                    value={movement.weightTwoValue}
                    onChange={(value) =>
                      handleChangeWeightTwoValue(index, value)
                    }
                  />
                )}
            </Section>
            <Section
              title="Rep Scheme"
              actions={
                <ModifyWorkoutButtons
                  count={movement.repScheme.length}
                  label="Rung"
                  onClickMinus={() => handleClickMinusRung(index)}
                  onClickPlus={() => handleClickPlusRung(index)}
                />
              }
            >
              {movement.repScheme.map((_, rungIndex) => (
                <ModifyCountButtons
                  key={rungIndex}
                  value={movement.repScheme[rungIndex]}
                  onChange={(value) =>
                    handleChangeRepScheme(index, rungIndex, value)
                  }
                  onClickMinus={() =>
                    handleChangeRepScheme(
                      index,
                      rungIndex,
                      movement.repScheme[rungIndex] - 1,
                    )
                  }
                  onClickPlus={() =>
                    handleChangeRepScheme(
                      index,
                      rungIndex,
                      movement.repScheme[rungIndex] + 1,
                    )
                  }
                  text="reps"
                />
              ))}
            </Section>
          </Card>
        );
      })}

      <Button variant="secondary" onClick={handleClickAddMovement}>
        + Movement
      </Button>

      {isDifferentRepSchemes && (
        <div className="text-sm text-red-500">
          Rep schemes must contain the same number of rungs for each movement.
        </div>
      )}
    </Page>
  );
};
