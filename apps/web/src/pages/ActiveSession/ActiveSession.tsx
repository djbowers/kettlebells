import { PlayPauseIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

import { Button } from '~/components';

interface Props {
  task: string;
  completedPercentage: number;
  reps: number;
  notes: string;
}

export const ActiveSession = ({
  task,
  completedPercentage,
  reps,
  notes,
}: Props) => {
  const [round, setRound] = useState<number>(1);

  const handleClickPlus = () => {
    setRound((prev) => (prev += 1));
  };

  const completedRounds = round - 1;
  const completedReps = completedRounds * reps;

  return (
    <>
      <Progress completedPercentage={completedPercentage} />
      <div className="p-3 flex flex-col space-y-2 h-full">
        <div className="font-medium text-2xl">{task}</div>
        <Button className="border border-gray-700 w-full flex justify-center items-center py-1 rounded">
          <PlayPauseIcon className="h-3 w-3" />
        </Button>

        <div className="grow flex flex-col space-y-3 justify-center items-center">
          <div className="font-medium text-2xl">Round {round}</div>
          <div className="text-6xl font-medium">
            {reps} <span className="text-2xl">reps</span>
          </div>
          <Button
            className="w-full bg-blue-500 flex items-center justify-center rounded py-1"
            onClick={handleClickPlus}
          >
            <PlusIcon className="h-4 w-4 font-bold" />
          </Button>
          <div className="text-md">
            Completed {completedRounds} rounds ({completedReps} reps)
          </div>
        </div>

        <div>
          <Button className="border border-gray-700 w-full flex justify-center items-center py-1 rounded">
            <div>FINISH WORKOUT</div>
          </Button>
        </div>
      </div>
    </>
  );
};

const Progress = ({ completedPercentage }: { completedPercentage: number }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-5 dark:bg-gray-700">
      <div
        className="bg-green-400 h-5 rounded-full"
        style={{ width: `${completedPercentage}%` }}
      />
    </div>
  );
};
