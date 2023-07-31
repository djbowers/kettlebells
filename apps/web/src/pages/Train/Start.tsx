import {
  ChevronUpDownIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { ReactNode, useMemo, useRef, useState } from 'react';

import { Exercise, useExercises } from '~/api';
import { Button, Loading, Select, SelectOption } from '~/components';

import { MovementCheckbox } from './components';

export const Start = () => {
  const [trainingGoal, setTrainingGoal] = useState<SelectOption>(goals[0]);
  const handleChangeGoal = (goal: SelectOption) => setTrainingGoal(goal);

  const [push, setPush] = useState<boolean>(true);
  const [pull, setPull] = useState<boolean>(true);
  const [hinge, setHinge] = useState<boolean>(true);
  const [squat, setSquat] = useState<boolean>(true);

  const handleTogglePush = () => setPush((prev) => !prev);
  const handleTogglePull = () => setPull((prev) => !prev);
  const handleToggleHinge = () => setHinge((prev) => !prev);
  const handleToggleSquat = () => setSquat((prev) => !prev);

  const {
    data: { exercises },
    loading,
  } = useExercises();

  let pushCount = 0;
  let pullCount = 0;
  let hingeCount = 0;
  let squatCount = 0;

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      // don't use compound movements for now
      if (exercise.movements.includes('compound')) return false;

      if (push && exercise.movements.includes('push') && pushCount < 1) {
        pushCount += 1;
        return true;
      }
      if (pull && exercise.movements.includes('pull') && pullCount < 1) {
        pullCount += 1;
        return true;
      }
      if (hinge && exercise.movements.includes('hinge') && hingeCount < 1) {
        hingeCount += 1;
        return true;
      }
      if (squat && exercise.movements.includes('squat') && squatCount < 1) {
        squatCount += 1;
        return true;
      }
      return false;
    });
  }, [push, pull, hinge, squat, loading]);

  const [active, setActive] = useState<boolean>(false);
  const handleStart = () => setActive(true);

  return !active ? (
    <div>
      <Section>
        <div className="text-lg">Let's get started!</div>
      </Section>

      <Section>
        <div>Training Goal</div>
        <Select
          value={trainingGoal}
          onChange={handleChangeGoal}
          options={goals}
        />
      </Section>

      <Section>
        <div>Movements</div>
        <div className="grid grid-cols-2 gap-2">
          <MovementCheckbox
            checked={push}
            onClick={handleTogglePush}
            label="Push"
          />
          <MovementCheckbox
            checked={pull}
            onClick={handleTogglePull}
            label="Pull"
          />
          <MovementCheckbox
            checked={hinge}
            onClick={handleToggleHinge}
            label="Hinge"
          />
          <MovementCheckbox
            checked={squat}
            onClick={handleToggleSquat}
            label="Squat"
          />
        </div>
      </Section>

      <Section>
        <div>Exercises</div>
        {loading ? (
          <Loading />
        ) : (
          filteredExercises.map((exercise) => (
            <ExerciseListItem key={exercise.name} exercise={exercise} />
          ))
        )}
      </Section>

      <div className="flex justify-center">
        <Button onClick={handleStart}>Start</Button>
      </div>
    </div>
  ) : (
    <div>active</div>
  );
};

const ExerciseListItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <div className="flex items-center">
      <ChevronUpDownIcon className="h-2.5 w-2.5" />
      <div className="grow">{exercise.name}</div>
      <EllipsisVerticalIcon className="h-2.5 w-2.5" />
    </div>
  );
};

const Section = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 mb-2 w-full">{children}</div>;
};

const goals: SelectOption[] = [
  { id: 1, name: 'Max Strength' },
  { id: 2, name: 'Strength-Endurance' },
  { id: 3, name: 'Hypertrophy' },
  { id: 4, name: 'Aerobic Endurance' },
];
