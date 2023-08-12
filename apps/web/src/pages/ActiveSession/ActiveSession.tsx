import { PlayPauseIcon, PlusIcon } from '@heroicons/react/24/outline';

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
  return (
    <>
      <Progress completedPercentage={completedPercentage} />
      <div className="p-3 flex flex-col space-y-2 h-full">
        <div className="font-medium text-2xl">{task}</div>
        <Button className="border border-gray-700 w-full flex justify-center items-center py-1 rounded">
          <PlayPauseIcon className="h-3 w-3" />
        </Button>

        <div className="grow flex flex-col space-y-3 justify-center items-center">
          <div className="font-medium text-2xl">4th Round</div>
          <div className="text-6xl font-medium">
            24 <span className="text-2xl">reps</span>
          </div>
          <Button className="w-full bg-blue-500 flex items-center justify-center rounded py-1">
            <PlusIcon className="h-4 w-4 font-bold" />
          </Button>
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
