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
    movements,
    repScheme,
  } = completedWorkout;

  const displayDate = getDisplayDate(date.toISOString());

  const workoutVolume =
    completedReps * bells.reduce((total, bell) => total + bell, 0);

  const repSchemeDisplayValue = getRepSchemeDisplayValue(repScheme, bells);

  const bellsDisplayValue = getBellWeightsDisplayValue(bells);

  return (
    <div
      className="flex flex-col gap-1 rounded-2xl border p-2"
      data-testid="workout-history-item"
    >
      <div>{displayDate}</div>

      <div className="flex justify-between">
        <div>⏱️ {duration} min</div>
        <div>🔂 {repSchemeDisplayValue} reps</div>
        <div>🏋️ {bellsDisplayValue} kg</div>
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="text-subdued uppercase">Movements</div>

        {movements.map((movement) => {
          return <div key={movement}>{movement}</div>;
        })}
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="text-subdued uppercase">Completed</div>

        <div className="flex justify-between">
          <div>🔁 {completedRounds} rounds</div>
          <div>💪 {completedReps} reps</div>
          <div>🏆 {workoutVolume} kg</div>
        </div>
      </div>
    </div>
  );
};
