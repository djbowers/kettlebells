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
  const [tasks, setTasks] = useState<string[]>(['']);
  const [minutes, setMinutes] = useState<number>(20);
  const [weight, setWeight] = useState<number>(0);
  const [weight2, setWeight2] = useState<number | null>(null);
  const [reps, setReps] = useState<number[]>([5]);
  const [notes, setNotes] = useState<string>('');

  const totalRepsPerRound = reps.reduce((acc, curr) => acc + curr, 0);

  const handleIncrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => (prev += 5));
  };
  const handleDecrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 5);
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

  const bells = [weight];
  if (weight2) bells.push(weight2);

  const workoutOptions = {
    tasks,
    minutes,
    bells,
    reps,
    notes,
  };

  const handleClickStart = () => {
    onStart?.(workoutOptions);
  };

  return (
    <Page>
      <Section>
        {tasks.map((task, index) => (
          <TaskInput
            key={index}
            index={index}
            value={task}
            onChange={setTasks}
          />
        ))}
      </Section>

      <Section title="Timer">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleDecrementTimer}
            className="flex h-5 w-5 items-center justify-center bg-blue-500"
          >
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-center text-5xl">{minutes}</div>
            <div className="text-center text-xl">min</div>
          </div>
          <Button
            onClick={handleIncrementTimer}
            className="flex h-5 w-5 items-center justify-center bg-blue-500"
          >
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </Section>

      <Section title="Round">
        <div className="flex items-center justify-between gap-5">
          <Button
            className="h-5 grow border border-blue-100 border-opacity-50 text-center"
            onClick={handleClickMinusRung}
            disabled={reps.length === 1}
          >
            - Rung
          </Button>
          <Button
            className="h-5 grow border border-blue-100 border-opacity-50 text-center"
            onClick={handleClickPlusRung}
          >
            + Rung
          </Button>
        </div>
        {reps.length > 1 && (
          <div className="text-center text-2xl font-medium">
            {totalRepsPerRound} total reps / round
          </div>
        )}
        {reps.map((_, index) => (
          <RepsInput
            key={index}
            value={reps}
            onChange={setReps}
            index={index}
          />
        ))}
      </Section>

      <Section title="Weights">
        <div className="flex justify-between px-3">
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={weight}
              onChange={handleChangeWeight}
              className="w-[100px]"
            />
            <div>kg</div>
          </div>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={weight2}
              onChange={handleChangeWeight2}
              className="w-[100px]"
              disabled={!weight}
            />
            <div className={clsx({ 'opacity-20': !weight })}>kg</div>
          </div>
        </div>
      </Section>

      <Section title="Notes" flag="optional">
        <Input value={notes} onChange={handleChangeNotes} className="w-full" />
      </Section>

      <div className="flex justify-center">
        <Button
          className="h-5 w-full bg-blue-500"
          onClick={handleClickStart}
          disabled={tasks[0] === '' || weight === 0}
        >
          <div className="text-center text-xl font-medium">START</div>
        </Button>
      </div>
    </Page>
  );
};

const TaskInput = ({
  onChange,
  value,
  index,
}: {
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string;
  index: number;
}) => {
  const handleChangeTask: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange((prev) => {
      const tasks = [...prev];
      tasks[index] = e.target.value;
      return tasks;
    });
  };

  return (
    <Input
      label="Task"
      value={value}
      onChange={handleChangeTask}
      className="w-full"
      id="task"
    />
  );
};

const RepsInput = ({
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
    <div className="flex justify-between">
      <Button
        onClick={handleDecrementReps}
        className="flex h-5 w-5 items-center justify-center bg-blue-500"
      >
        <MinusIcon className="h-3 w-3" />
      </Button>
      <div className="grow">
        <div className="text-center text-5xl">{value[index]}</div>
        <div className="text-center text-xl">{label}</div>
      </div>
      <Button
        onClick={handleIncrementReps}
        className="flex h-5 w-5 items-center justify-center bg-blue-500"
      >
        <PlusIcon className="h-3 w-3" />
      </Button>
    </div>
  );
};

const Section = ({
  children,
  flag,
  title,
}: {
  children: ReactNode;
  flag?: 'required' | 'optional';
  title?: string;
}) => {
  return (
    <div className="flex flex-col space-y-1 rounded-lg border border-blue-100 border-opacity-50 p-2">
      <div className="-ml-1 -mt-1.5 flex items-center space-x-1">
        <div className="text-base font-medium">{title}</div>
        {flag === 'optional' && (
          <div className="text-sm font-medium text-neutral-500">(optional)</div>
        )}
      </div>
      <div className="flex flex-col space-y-2 px-3">{children}</div>
    </div>
  );
};
