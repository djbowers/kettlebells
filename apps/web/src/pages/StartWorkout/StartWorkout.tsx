import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';

import { Button, Input } from '~/components';
import { WorkoutOptions } from '~/types';

interface Props {
  onStart?: (workoutOptions: WorkoutOptions) => void;
}

export const StartWorkout = ({ onStart }: Props) => {
  const [task, setTask] = useState<string>('');
  const [minutes, setMinutes] = useState<number>(20);
  const [weight, setWeight] = useState<number>(0);
  const [weight2, setWeight2] = useState<number | null>(null);
  const [reps, setReps] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');

  const handleChangeTask: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTask(e.target.value);
  };
  const handleIncrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => (prev += 1));
  };
  const handleDecrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 1);
    });
  };
  const handleChangeWeight: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setWeight(newWeight);
  };
  const handleChangeWeight2: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    if (newWeight > 0) {
      setWeight2(newWeight);
    } else {
      setWeight2(null);
    }
  };
  const handleIncrementReps: MouseEventHandler<HTMLButtonElement> = () => {
    setReps((prev) => (prev += 1));
  };
  const handleDecrementReps: MouseEventHandler<HTMLButtonElement> = () => {
    setReps((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 1);
    });
  };
  const handleChangeNotes: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNotes(e.target.value);
  };

  const workoutOptions = {
    task,
    minutes,
    weight,
    weight2,
    reps,
    notes,
  };

  const handleClickStart = () => {
    console.log(workoutOptions);
    onStart?.(workoutOptions);
  };

  return (
    <>
      <Section title="Task">
        <Input value={task} onChange={handleChangeTask} />
      </Section>

      <Section title="Timer">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleDecrementTimer}
            className="flex h-5 w-5 items-center justify-center rounded bg-blue-500"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-center text-5xl">{minutes}</div>
            <div className="text-center text-xl">min</div>
          </div>
          <Button
            onClick={handleIncrementTimer}
            className="flex h-5 w-5 items-center justify-center rounded bg-blue-500"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </Section>

      <Section title="Weights">
        <div className="flex justify-between">
          <Input type="number" value={weight} onChange={handleChangeWeight} />
          <Input
            type="number"
            value={weight2}
            onChange={handleChangeWeight2}
            disabled={!weight}
          />
        </div>
      </Section>

      <Section title="Round">
        <div className="flex justify-between">
          <Button
            onClick={handleDecrementReps}
            className="flex h-5 w-5 items-center justify-center rounded bg-blue-500"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-center text-5xl">{reps}</div>
            <div className="text-center text-xl">reps / round</div>
          </div>
          <Button
            onClick={handleIncrementReps}
            className="flex h-5 w-5 items-center justify-center rounded bg-blue-500"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </Section>

      <Section title="Notes" flag="optional">
        <Input value={notes} onChange={handleChangeNotes} />
      </Section>

      <div className="flex justify-center">
        <Button
          className="h-5 w-full rounded bg-blue-500"
          onClick={handleClickStart}
          disabled={task === '' || weight === 0}
        >
          <div className="text-center text-xl font-medium">START</div>
        </Button>
      </div>
    </>
  );
};

const Section = ({
  children,
  flag,
  title,
}: {
  children: ReactNode;
  flag?: 'required' | 'optional';
  title: string;
}) => {
  return (
    <div className="flex flex-col space-y-1 rounded-lg border border-blue-100 border-opacity-50 p-2">
      <div className="-ml-1 -mt-1.5 flex items-center space-x-1">
        <div className="text-base font-medium">{title}</div>
        {flag === 'optional' && (
          <div className="text-sm font-medium text-neutral-500">(optional)</div>
        )}
      </div>
      <div className="px-3">{children}</div>
    </div>
  );
};
