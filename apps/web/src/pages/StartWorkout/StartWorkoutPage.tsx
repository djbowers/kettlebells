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
  const [bells, setBells] = useState<[number, number]>([16, 0]);
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
      if (prev[1] > 0) return [newWeight, prev[1]];
      return [newWeight, 0];
    });
  };
  const handleChangeSecondBell: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const newWeight = Number(value);
    setBells((prev) => {
      if (newWeight > 0) return [prev[0], newWeight];
      return [prev[0], 0];
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

  const unit = 'kg';
  const primaryBell = bells[0];
  const secondBell = bells[1];

  const doubleBells = secondBell > 0;
  const singleBell = secondBell === 0;
  const mismatchedBells = primaryBell !== secondBell;
  const roundsDoubled = singleBell || mismatchedBells;

  const multipleTasks = tasks.length > 1;
  const totalRepsPerRound = reps.reduce((totalReps, repsInRung) => {
    let multiplier = tasks.length;
    if (roundsDoubled) multiplier = multiplier * 2;
    return totalReps + repsInRung * multiplier;
  }, 0);

  const startDisabled = tasks[0] === '' || primaryBell === 0;
  const tasksTitle = 'Task' + (multipleTasks ? 's' : '');
  const bellsTitle = 'Bell' + (doubleBells ? 's' : '') + ` (${unit})`;

  return (
    <Page>
      <Section title={tasksTitle}>
        {tasks.map((task, index) => {
          const taskNumber = index + 1;
          return (
            <div key={index} className="flex items-center gap-2">
              {multipleTasks && (
                <div className="text-default">{taskNumber}</div>
              )}
              <TaskInput index={index} value={task} onChange={setTasks} />
            </div>
          );
        })}
        <PlusMinusButtons
          count={tasks.length}
          label="Task"
          onClickMinus={handleClickMinusTask}
          onClickPlus={handleClickPlusTask}
        />
      </Section>

      <Section title={bellsTitle}>
        <div className="flex items-center justify-between gap-2">
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
          <Button onClick={handleDecrementTimer} kind="primary">
            <MinusIcon className="h-3 w-3" />
          </Button>
          <div className="grow">
            <div className="text-default text-center text-4xl">{minutes}</div>
            <div className="text-default text-center text-lg">min</div>
          </div>
          <Button onClick={handleIncrementTimer} kind="primary">
            <PlusIcon className="h-3 w-3" />
          </Button>
        </div>
      </Section>

      <Section title="Round">
        <div className="text-default text-center text-xl font-medium">
          {totalRepsPerRound} total reps / round
        </div>

        {reps.map((_, index) => (
          <RepSchemePicker
            key={index}
            value={reps}
            onChange={setReps}
            index={index}
          />
        ))}
        <PlusMinusButtons
          count={reps.length}
          label="Rung"
          onClickMinus={handleClickMinusRung}
          onClickPlus={handleClickPlusRung}
        />
      </Section>

      <Section title="Notes" flag="optional" bottomBorder={false}>
        <Input value={notes} onChange={handleChangeNotes} className="w-full" />
      </Section>

      <div className="flex justify-center">
        <Button
          className="w-full text-xl font-medium uppercase"
          kind="primary"
          onClick={handleClickStart}
          disabled={startDisabled}
        >
          Start
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

const RepSchemePicker = ({
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
      <Button onClick={handleDecrementReps} kind="primary">
        <MinusIcon className="h-3 w-3" />
      </Button>
      <div className="grow">
        <div className="text-default text-center text-4xl">{value[index]}</div>
        <div className="text-default text-center text-lg">{label}</div>
      </div>
      <Button onClick={handleIncrementReps} kind="primary">
        <PlusIcon className="h-3 w-3" />
      </Button>
    </div>
  );
};

const Section = ({
  children,
  flag,
  title,
  bottomBorder = true,
}: {
  children: ReactNode;
  flag?: 'required' | 'optional';
  title?: string;
  bottomBorder?: boolean;
}) => {
  return (
    <div
      className={clsx('layout flex flex-col space-y-2 pb-3', {
        'border-b': bottomBorder,
      })}
    >
      <div className="flex items-center space-x-1">
        <div className="text-default text-base font-medium">{title}</div>
        {flag === 'optional' && (
          <div className="text-subdued text-sm font-medium">(optional)</div>
        )}
      </div>
      <div className="flex flex-col space-y-2 px-2">{children}</div>
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
      {count > 1 && (
        <Button kind="outline" onClick={onClickMinus}>
          - {label}
        </Button>
      )}
      <Button kind="outline" onClick={onClickPlus} className="ml-auto">
        + {label}
      </Button>
    </div>
  );
};
