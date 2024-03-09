import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { WorkoutLog } from '~/types';

import { getDisplayDate } from '../CompletedWorkoutPage';
import { getBellWeightsDisplayValue, getRepSchemeDisplayValue } from '../utils';

export interface WorkoutHistoryItemProps {
  completedWorkout: WorkoutLog;
}

export const WorkoutHistoryItem = ({
  completedWorkout,
}: WorkoutHistoryItemProps) => {
  const {
    bells,
    completedReps,
    completedRounds,
    date,
    duration,
    intervalTimer,
    movements,
    notes,
    repScheme,
    restTimer,
  } = completedWorkout;

  const displayDate = getDisplayDate(date.toISOString());

  const workoutLoad = bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = completedReps * workoutLoad;

  const repSchemeDisplayValue = getRepSchemeDisplayValue(repScheme, bells);
  const bellsDisplayValue = getBellWeightsDisplayValue(bells);

  return (
    <Card data-testid="workout-history-item">
      <CardHeader>
        <CardTitle>{displayDate}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between">
          <div>⏱️ {duration} min</div>
          {workoutLoad > 0 && <div>🏋️ {bellsDisplayValue} kg</div>}
          <div>🔂 {repSchemeDisplayValue} reps</div>
        </div>

        <div className="flex justify-between">
          {intervalTimer > 0 && <div>Interval: {intervalTimer} seconds</div>}
          {restTimer > 0 && <div>Rest: {restTimer} seconds</div>}
        </div>

        <div className="flex flex-col gap-0.5">
          <div className="text-muted-foreground uppercase">Movements</div>

          {movements.map((movement) => {
            return <div key={movement}>{movement}</div>;
          })}
        </div>

        {notes && (
          <div className="flex flex-col gap-0.5">
            <div className="text-muted-foreground uppercase">Notes</div>
            <div>{notes}</div>
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          <div className="text-muted-foreground uppercase">Completed</div>

          <div className="flex justify-between">
            <div>🔁 {completedRounds} rounds</div>
            {workoutVolume > 0 && <div>🏆 {workoutVolume} kg</div>}
            <div>💪 {completedReps} reps</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
