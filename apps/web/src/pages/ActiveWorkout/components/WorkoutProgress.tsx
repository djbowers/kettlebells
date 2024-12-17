import { PauseIcon } from '@radix-ui/react-icons';

import { Button } from '~/components/ui/button';

import { ProgressBar } from './ProgressBar';

interface WorkoutProgressProps {
  completedRounds: number;
  formattedTimeRemaining: string;
  handleClickPause: () => void;
  remainingMilliseconds: number;
  workoutGoal: number;
  workoutGoalUnits: string;
  workoutTimerPaused: boolean;
}

export const WorkoutProgress = ({
  completedRounds,
  formattedTimeRemaining,
  handleClickPause,
  remainingMilliseconds,
  workoutGoal,
  workoutGoalUnits,
  workoutTimerPaused,
}: WorkoutProgressProps) => {
  let progressBarValue: string | undefined;
  let completedPercentage: number = 0;

  if (workoutGoalUnits === 'minutes' && workoutGoal > 0) {
    progressBarValue = formattedTimeRemaining;
    const totalMilliseconds = workoutGoal * 60000;
    completedPercentage =
      ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100;
  }

  if (workoutGoalUnits === 'rounds') {
    progressBarValue = (workoutGoal - completedRounds).toString();
    completedPercentage =
      (1 - (workoutGoal - completedRounds) / workoutGoal) * 100;
  }

  return (
    <div className="flex w-full items-center gap-1">
      <ProgressBar
        completedPercentage={completedPercentage}
        description="remaining"
        value={progressBarValue}
      />

      {workoutGoalUnits === 'minutes' && workoutGoal > 0 && (
        <div>
          <Button
            disabled={workoutTimerPaused}
            onClick={handleClickPause}
            size="icon"
            variant="secondary"
          >
            <PauseIcon className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
};
