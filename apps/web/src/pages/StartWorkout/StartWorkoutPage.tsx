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
  const [bells, setBells] = useState<[number, number?]>([16]);
  const [reps, setReps] = useState<number[]>([5]);
  const [notes, setNotes] = useState<string>('');

  const handleClickMinusTask: MouseEventHandler<HTMLButtonElement> = () => {
    if (tasks.length > 1)
      setTasks((prev) => {
        const tasks = [...prev];
        tasks.pop();
        return tasks;
      });
  };
  const handleClickPlusTask: MouseEventHandler<HTMLButtonElement> = () => {
    setTasks((prev) => [...prev, '']);
  };
  const handleIncrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => (prev += 5));
  };
  const handleDecrementTimer: MouseEventHandler<HTMLButtonElement> = () => {
    setMinutes((prev) => {
      if (prev <= 1) return prev;
      else return (prev -= 5);
    });
  };
  const handleChangePrimaryBell: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setBells((prev) => {
      if (prev?.[1]) return [newWeight, prev[1]];
      return [newWeight];
    });
  };
  const handleChangeSecondBell: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setBells((prev) => {
      if (newWeight > 0) return [prev[0], newWeight];
      return [prev[0]];
    });
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

  const handleClickStart = () => {
    const workoutOptions: WorkoutOptions = {
      tasks,
      minutes,
      bells,
      reps,
      notes,
    };
    onStart?.(workoutOptions);
  };

  const primaryBell = bells[0];
  const secondBell = bells?.[1];
  const startDisabled = tasks[0] === '' || primaryBell === 0;
  const totalRepsPerRound = reps.reduce((acc, curr) => acc + curr, 0);

  return (
    <Page>
      <Section title={'Task' + (tasks.length > 1 ? 's' : '')}>
        <PlusMinusButtons
          count={tasks.length}
          label="Task"
          onClickMinus={handleClickMinusTask}
          onClickPlus={handleClickPlusTask}
        />
        {tasks.map((task, index) => (
          <TaskInput
            key={index}
            index={index}
            value={task}
            onChange={setTasks}
          />
        ))}
      </Section>

      <Section title={`Bell${bells.length === 2 ? 's' : ''} (kg)`}>
        <div className="flex justify-between gap-3">
          <Input
            type="number"
            value={primaryBell}
            onChange={handleChangePrimaryBell}
          />
          <Input
            type="number"
            value={secondBell}
            onChange={handleChangeSecondBell}
            disabled={!primaryBell}
          />
        </div>
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
        <PlusMinusButtons
          count={reps.length}
          label="Rung"
          onClickMinus={handleClickMinusRung}
          onClickPlus={handleClickPlusRung}
        />
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

      <Section title="Notes" flag="optional">
        <Input value={notes} onChange={handleChangeNotes} className="w-full" />
      </Section>

      <div className="flex justify-center">
        <Button
          className="h-5 w-full bg-blue-500 text-center text-xl font-medium"
          onClick={handleClickStart}
          disabled={startDisabled}
        >
          START
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
      aria-label="Task Input"
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

const PlusMinusButtons = ({
  count,
  label,
  onClickMinus,
  onClickPlus,
}: {
  count: number;
  label: string;
  onClickMinus: MouseEventHandler<HTMLButtonElement>;
  onClickPlus: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <Button
        className="h-5 grow border border-blue-100 border-opacity-50 text-center"
        onClick={onClickMinus}
        hidden={count <= 1}
      >
        - {label}
      </Button>
      <Button
        className="h-5 grow border border-blue-100 border-opacity-50 text-center"
        onClick={onClickPlus}
      >
        + {label}
      </Button>
    </div>
  );
};
