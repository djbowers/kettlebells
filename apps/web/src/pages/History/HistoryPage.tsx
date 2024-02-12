import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useWorkoutLogs } from '~/api';
import { Loading, Page } from '~/components';
import { WorkoutLog } from '~/types';

export const HistoryPage = () => {
  const { data: workoutLogs, isLoading } = useWorkoutLogs();

  const itemsGroupedByDate = useMemo(() => {
    const groupedWorkouts =
      workoutLogs?.reduce(
        (
          groupedWorkoutLogs: { [date: string]: WorkoutLog[] },
          workoutLog: WorkoutLog,
        ) => {
          const completedDate = workoutLog.date.toDateString();
          if (!groupedWorkoutLogs[completedDate]) {
            groupedWorkoutLogs[completedDate] = [workoutLog];
          } else {
            groupedWorkoutLogs[completedDate].push(workoutLog);
            groupedWorkoutLogs[completedDate].sort(
              (a, b) => b.date.getTime() - a.date.getTime(),
            );
          }
          return groupedWorkoutLogs;
        },
        {},
      ) || {};
    return Object.entries(groupedWorkouts).sort(
      ([a], [b]) => new Date(b).getTime() - new Date(a).getTime(),
    );
  }, [workoutLogs]);

  return (
    <Page>
      <div className="text-default flex flex-col gap-3">
        <div className="text-xl font-bold">History</div>
        <div className="text-subdued text-md grid grid-cols-4 px-2 font-medium uppercase">
          <div>Date</div>
          <div className="col-span-2">Movements</div>
          <div className="text-right">Volume</div>
        </div>

        <div className="flex flex-col gap-1">
          {itemsGroupedByDate.map(([date, workoutLogs]) => (
            <HistoryItemGroup key={date} workoutLogs={workoutLogs} />
          ))}
        </div>

        {isLoading && <Loading />}
      </div>
    </Page>
  );
};

const WorkoutHistoryItem = ({
  workoutLog,
  showDate = false,
}: {
  workoutLog: WorkoutLog;
  showDate: boolean;
}) => {
  const workoutDetailsPath = '/history/' + workoutLog.id;
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
    <Link
      className="hover:bg-layout-darker grid grid-cols-4 rounded-xl px-2 py-1 hover:cursor-pointer"
      to={workoutDetailsPath}
    >
      <div>{showDate && formattedWorkoutDate}</div>
      <div className="col-span-2">
        {workoutLog.movements.map((movement, i) => (
          <div key={i}>{movement}</div>
        ))}
        {workoutLog.notes && (
          <div className="text-subdued">{workoutLog.notes}</div>
        )}
      </div>
      <div className="text-right">{displayText}</div>
    </Link>
  );
};

const HistoryItemGroup = ({
  workoutLogs = [],
}: {
  workoutLogs: WorkoutLog[];
}) => (
  <>
    {workoutLogs.map((workoutLog, index) => (
      <WorkoutHistoryItem
        key={workoutLog.id}
        workoutLog={workoutLog}
        showDate={index === 0}
      />
    ))}
    <hr className="m-1" />
  </>
);
