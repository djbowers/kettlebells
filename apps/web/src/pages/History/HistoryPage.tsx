import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useWorkoutLogs } from '~/api';
import { Loading, Page } from '~/components';
import { WorkoutLog } from '~/types';

export const HistoryPage = () => {
  const { data: workoutLogs, isLoading } = useWorkoutLogs();

  const sortedWorkoutLogs = useMemo(
    () =>
      workoutLogs?.sort((a, b) => b.date.getTime() - a.date.getTime()) || [],
    [workoutLogs],
  );

  return (
    <Page>
      <div className="text-default flex flex-col gap-2">
        <div className="text-xl font-bold">History</div>
        <div className="text-subdued text-md grid grid-cols-4 px-2 font-medium uppercase">
          <div>Date</div>
          <div className="col-span-2">Movements</div>
          <div className="text-right">Volume</div>
        </div>

        {sortedWorkoutLogs.map((workoutLog) => (
          <WorkoutHistoryItem key={workoutLog.id} workoutLog={workoutLog} />
        ))}

        {isLoading && <Loading />}
      </div>
    </Page>
  );
};

const WorkoutHistoryItem = ({ workoutLog }: { workoutLog: WorkoutLog }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/history/' + workoutLog.id);
  };

  const formattedWorkoutDate = DateTime.fromJSDate(workoutLog.date).toFormat(
    'MM-d ccc',
  );
  const totalWeight = workoutLog.bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = workoutLog.completedReps * totalWeight;
  const displayText =
    workoutVolume > 0
      ? `${workoutVolume.toFixed(0)} kg`
      : `${workoutLog.completedReps} reps`;

  return (
    <div
      key={workoutLog.id}
      className="hover:bg-layout-darker grid grid-cols-4 rounded-xl px-2 py-1 hover:cursor-pointer"
      onClick={handleClick}
    >
      <div>{formattedWorkoutDate}</div>
      <div className="col-span-2">
        {workoutLog.movements.map((movement, i) => (
          <div key={i}>{movement}</div>
        ))}
        {workoutLog.notes && (
          <div className="text-subdued">{workoutLog.notes}</div>
        )}
      </div>
      <div className="text-right">{displayText}</div>
    </div>
  );
};
