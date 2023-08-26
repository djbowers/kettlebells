import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  useState,
} from 'react';

import { Button, Input } from '~/components';

interface WorkoutOptions {
  task: string;
  minutes: number;
  reps: number;
  notes: string;
}

interface Props {
  onStart?: (workoutOptions: WorkoutOptions) => void;
}

export const StartWorkout = ({ onStart }: Props) => {
  const [task, setTask] = useState<string>('');
  const [minutes, setMinutes] = useState<number>(20);
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
        <div className="flex items-center justify-between px-4">
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

      <Section title="Round">
        <div className="flex justify-between px-4">
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

      <Section title="Notes">
        <Input value={notes} onChange={handleChangeNotes} />
      </Section>

      <div className="flex justify-center">
        <Button
          className="h-5 w-full rounded bg-blue-500"
          onClick={handleClickStart}
          disabled={task === ''}
        >
          <div className="text-center text-xl font-medium">START</div>
        </Button>
      </div>
    </>
  );
};

const Section = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col space-y-1 rounded-lg border p-2">
      <div className="-mt-2 -ml-1 text-base font-medium">{title}</div>
      {children}
    </div>
  );
};
