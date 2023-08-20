import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ChangeEventHandler, MouseEventHandler, useState } from 'react';

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
      <div className="flex flex-col space-y-1">
        <div className="text-center font-medium text-2xl">Task</div>
        <Input value={task} onChange={handleChangeTask} />
      </div>

      {/* Timer */}
      <div className="flex flex-col space-y-1">
        <div className="text-center font-medium text-2xl">Timer</div>
        <div className="flex items-center justify-between">
          <Button
            onClick={handleDecrementTimer}
            className="bg-blue-500 w-5 h-5 rounded flex items-center justify-center"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-5xl text-center">{minutes}</div>
            <div className="text-xl text-center">min</div>
          </div>
          <Button
            onClick={handleIncrementTimer}
            className="bg-blue-500 w-5 h-5 rounded flex items-center justify-center"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Reps */}
      <div className="flex flex-col space-y-1">
        <div className="flex justify-between">
          <Button
            onClick={handleDecrementReps}
            className="bg-blue-500 w-5 h-5 rounded flex items-center justify-center"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-5xl text-center">{reps}</div>
            <div className="text-xl text-center">reps / round</div>
          </div>
          <Button
            onClick={handleIncrementReps}
            className="bg-blue-500 w-5 h-5 rounded flex items-center justify-center"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Notes */}
      <div className="flex flex-col space-y-1">
        <div className="text-center font-medium text-2xl">Notes</div>
        <Input value={notes} onChange={handleChangeNotes} />
      </div>

      <div className="flex justify-center">
        <Button
          className="bg-blue-500 w-full rounded h-5"
          onClick={handleClickStart}
          disabled={task === ''}
        >
          <div className="text-center text-xl font-medium">START</div>
        </Button>
      </div>
    </>
  );
};
