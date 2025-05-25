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
  let completedPercentage: number = 0;
  let progressBarDescription: string | undefined;
  let progressBarValue: string | undefined;

  if (workoutGoalUnits === 'minutes') {
    progressBarValue = formattedTimeRemaining;
    const totalMilliseconds = workoutGoal * 60000;
    completedPercentage =
      ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100;
    progressBarDescription = 'remaining';
  }

  if (workoutGoalUnits === 'rounds') {
    progressBarValue = `${workoutGoal - completedRounds}`;
    completedPercentage =
      (1 - (workoutGoal - completedRounds) / workoutGoal) * 100;
    progressBarDescription = 'rounds';
  }

  return (
    <div className="flex w-full items-center gap-1">
      <ProgressBar
        completedPercentage={workoutGoal > 0 ? completedPercentage : 0}
        description={workoutGoal > 0 ? progressBarDescription : undefined}
        value={workoutGoal > 0 ? progressBarValue : undefined}
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
