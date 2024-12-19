import { DateTime, Duration } from 'luxon';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';

import {
  getBellWeightsDisplayValue,
  getDisplayDate,
  getDuration,
  getRepSchemeDisplayValue,
  getTimeRange,
} from '../utils';

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
  const displayDate = getDisplayDate(completedAt);
  const duration = getDuration(startedAt, completedAt);
  const timeRange = getTimeRange(startedAt, completedAt);

  const workoutLoad = bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = completedReps * workoutLoad;

  const repSchemeDisplayValue = getRepSchemeDisplayValue(repScheme, bells);
  const bellsDisplayValue = getBellWeightsDisplayValue(bells);

  return (
    <Card data-testid="workout-history-item">
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between gap-1">
          {displayDate}
          <CardDescription className="text-xs">{timeRange}</CardDescription>
        </CardTitle>
        {workoutDetails && (
          <CardDescription className="italic">{workoutDetails}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <CardDescription>Movements</CardDescription>
        {movements.map((movement) => (
          <div key={movement}>{movement}</div>
        ))}
      </CardContent>

      <CardContent className="grid grid-cols-2 gap-1">
        <div>
          <CardDescription id="rep-scheme">Rep Scheme</CardDescription>
          <div aria-labelledby="rep-scheme">{repSchemeDisplayValue} reps</div>
        </div>
        <div className="text-right">
          <CardDescription id="weights">Weights</CardDescription>
          <div aria-labelledby="weights">
            {workoutLoad > 0 ? `${bellsDisplayValue} kg` : 'Bodyweight'}{' '}
            {isOneHanded !== null && (isOneHanded ? '(1h)' : '(2h)')}
          </div>
        </div>
      </CardContent>

      <CardContent className="grid grid-cols-3 gap-1">
        <div>
          <CardDescription id="goal">Goal</CardDescription>
          <div aria-labelledby="goal">
            {workoutGoal} {workoutGoalUnits}
          </div>
        </div>
        <div className="text-center">
          <CardDescription id="intervals">Intervals</CardDescription>
          <div aria-labelledby="intervals">
            {intervalTimer > 0 ? `${intervalTimer}s` : 'None'}
          </div>
        </div>
        <div className="text-right">
          <CardDescription id="rest">Rest</CardDescription>
          <div aria-labelledby="rest">
            {restTimer > 0 ? `${restTimer}s` : 'None'}
          </div>
        </div>
      </CardContent>

      <CardContent>
        <Separator />
      </CardContent>

      <CardContent>
        <CardTitle>Workout Summary</CardTitle>
      </CardContent>

      <CardFooter className="grid grid-cols-4 gap-1">
        <div>
          <CardDescription id="elapsed">Elapsed</CardDescription>
          <div aria-labelledby="elapsed">{duration}</div>
        </div>
        <div className="text-center">
          <CardDescription id="rounds">Rounds</CardDescription>
          <div aria-labelledby="rounds">{completedRounds} rounds</div>
        </div>
        <div className="text-center">
          <CardDescription id="reps">Reps</CardDescription>
          <div aria-labelledby="reps">{completedReps} reps</div>
        </div>
        <div className="text-right">
          <CardDescription id="volume">Volume</CardDescription>
          <div aria-labelledby="volume">
            {workoutVolume > 0 ? `${workoutVolume} kg` : 'N/A'}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
