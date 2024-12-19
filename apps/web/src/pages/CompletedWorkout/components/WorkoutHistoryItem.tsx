import { DateTime, Duration } from 'luxon';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

import { getBellWeightsDisplayValue, getRepSchemeDisplayValue } from '../utils';

export interface WorkoutHistoryItemProps {
  bells: number[];
  completedAt: Date;
  completedReps: number;
  completedRounds: number;
  intervalTimer: number;
  isOneHanded: boolean | null;
  movements: string[];
  repScheme: number[];
  restTimer: number;
  startedAt: Date;
  workoutDetails: string | null;
  workoutGoal: number;
  workoutGoalUnits: string;
}

export const WorkoutHistoryItem = ({
  bells,
  completedAt,
  completedReps,
  completedRounds,
  intervalTimer,
  isOneHanded,
  movements,
  repScheme,
  restTimer,
  startedAt,
  workoutDetails,
  workoutGoal,
  workoutGoalUnits,
}: WorkoutHistoryItemProps) => {
  const displayDate = getDisplayDate(completedAt.toISOString());
  const duration = Duration.fromMillis(
    completedAt.getTime() - startedAt.getTime(),
  ).toFormat("h'h' m'm'");

  const workoutLoad = bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = completedReps * workoutLoad;

  const repSchemeDisplayValue = getRepSchemeDisplayValue(repScheme, bells);
  const bellsDisplayValue = getBellWeightsDisplayValue(bells);

  return (
    <Card data-testid="workout-history-item">
      <CardHeader>
        <CardTitle>
          {displayDate} ({duration})
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription>Workout Goal</CardDescription>
        <div className="flex justify-between gap-1">
          <div>
            🎯 {workoutGoal} {workoutGoalUnits}
          </div>
          {intervalTimer > 0 && <div>⏰ {intervalTimer} second intervals</div>}
          {restTimer > 0 && <div>😴 {restTimer} second rest</div>}
        </div>
      </CardContent>

      <CardContent>
        <CardDescription>Rep Scheme</CardDescription>
        <div className="flex justify-between gap-1">
          <div>🔂 {repSchemeDisplayValue} reps</div>
          {workoutLoad > 0 && <div>🏋️ {bellsDisplayValue} kg</div>}
          {isOneHanded !== null && (
            <div>🤛 {isOneHanded ? 'One-handed' : 'Two-handed'}</div>
          )}
        </div>
      </CardContent>

      <CardContent>
        <CardDescription>Movements</CardDescription>
        {movements.map((movement) => (
          <div key={movement}>{movement}</div>
        ))}
      </CardContent>

      {workoutDetails && (
        <CardContent>
          <CardDescription>Workout Details</CardDescription>
          {workoutDetails}
        </CardContent>
      )}

      <CardContent>
        <CardDescription>Completed</CardDescription>
        <div className="flex justify-between gap-1">
          <div>🔁 {completedRounds} rounds</div>
          <div>💪 {completedReps} reps</div>
          {workoutVolume > 0 && <div>🏆 {workoutVolume} kg</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export const getDisplayDate = (dateISOString: string) => {
  const date = DateTime.fromISO(dateISOString);
  const isCurrentYear = date.year === DateTime.now().year;
  return date.toFormat(isCurrentYear ? 'cccc, LLL dd' : 'cccc, LLL dd y');
};
