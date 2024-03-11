import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
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
        <CardDescription>Timers</CardDescription>
        <div className="flex justify-between gap-1">
          <div>⏱️ {duration} min</div>
          {intervalTimer > 0 && <div>⏰ {intervalTimer} second intervals</div>}
          {restTimer > 0 && <div>😴 {restTimer} second rest</div>}
        </div>
      </CardContent>

      <CardContent>
        <CardDescription>Rep Scheme</CardDescription>
        <div className="flex justify-between gap-1">
          <div>🔂 {repSchemeDisplayValue} reps</div>
          {workoutLoad > 0 && <div>🏋️ {bellsDisplayValue} kg</div>}
        </div>
      </CardContent>

      <CardContent>
        <CardDescription>Movements</CardDescription>
        {movements.map((movement) => (
          <div key={movement}>{movement}</div>
        ))}
      </CardContent>

      {notes && (
        <CardContent>
          <CardDescription>Notes</CardDescription>
          {notes}
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
