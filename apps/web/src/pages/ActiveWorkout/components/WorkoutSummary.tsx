import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { WorkoutGoalUnits } from '~/types';

const TIME_FORMAT = 'm:ss';

interface WorkoutSummaryProps {
  completedReps: number;
  completedRounds: number;
  handleClickFinish: () => void;
  isBodyweight: boolean;
  logWorkoutLoading?: boolean;
  startedAt?: Date;
  workoutGoal: number;
  workoutGoalUnits: WorkoutGoalUnits;
  workoutVolume: number;
}

export const WorkoutSummary = ({
  completedReps,
  completedRounds,
  handleClickFinish,
  isBodyweight = false,
  logWorkoutLoading = false,
  startedAt = new Date(),
  workoutGoal,
  workoutGoalUnits,
  workoutVolume,
}: WorkoutSummaryProps) => {
  const [formattedElapsed, setFormattedElapsed] = useState(() =>
    getFormattedElapsed(startedAt),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setFormattedElapsed(getFormattedElapsed(startedAt));
    }, 1000);

    return () => clearInterval(timer);
  }, [startedAt]);

  return (
    <Card
      className="bg-accent border-transparent"
      data-testid="completed-section"
    >
      <CardHeader className="text-center">
        <CardTitle>Workout Summary</CardTitle>
        {workoutGoal > 0 && (
          <CardDescription>
            Goal: {workoutGoal} {workoutGoalUnits}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-2">
        <CompletedItem label="Elapsed" value={formattedElapsed} />
        <CompletedItem label="Rounds" value={completedRounds} />
        <CompletedItem label="Reps" value={completedReps} />
        {!isBodyweight && (
          <CompletedItem label="Volume" value={workoutVolume} />
        )}
      </CardContent>

      <CardFooter className="flex items-center justify-center">
        <Button
          disabled={logWorkoutLoading}
          variant="ghost"
          onClick={handleClickFinish}
          className="w-full"
        >
          Finish workout
        </Button>
      </CardFooter>
    </Card>
  );
};

const CompletedItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex flex-col items-center justify-center gap-0.5">
    <div className="text-muted-foreground text-sm">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

const getFormattedElapsed = (startedAt: Date) => {
  return DateTime.now()
    .diff(DateTime.fromJSDate(startedAt))
    .toFormat(TIME_FORMAT);
};
