import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useWorkoutLogs } from '~/api';
import { Loading, Page } from '~/components';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { WorkoutLog } from '~/types';

import { RpeBadge } from '../CompletedWorkout/components';

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
              (a, b) => a.date.getTime() - b.date.getTime(),
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
      <div className="text-default flex flex-col gap-2">
        <div className="text-xl font-semibold">Workout History</div>

        <div className="flex flex-col gap-1">
          {itemsGroupedByDate.map(([date, workoutLogs]) => (
            <HistoryItemGroup
              key={date}
              workoutLogs={workoutLogs}
              date={date}
            />
          ))}
        </div>

        {isLoading && <Loading />}
      </div>
    </Page>
  );
};

const WorkoutHistoryItem = ({ workoutLog }: { workoutLog: WorkoutLog }) => {
  const workoutDetailsPath = '/history/' + workoutLog.id;
  const totalWeight = workoutLog.bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = workoutLog.completedReps * totalWeight;
  const displayText =
    workoutVolume > 0
      ? `${workoutVolume.toFixed(0)} kg`
      : `${workoutLog.completedReps} reps`;

  return (
    <Link
      className="hover:bg-layout-darker flex justify-between rounded-xl px-2 py-1 hover:cursor-pointer"
      to={workoutDetailsPath}
    >
      <div>
        {workoutLog.movements.map((movement, i) => (
          <div key={i}>{movement}</div>
        ))}
        {workoutLog.notes && (
          <div className="text-subdued">{workoutLog.notes}</div>
        )}
      </div>
      <div className="flex grow items-center justify-end gap-1">
        {workoutLog.rpe !== null && <RpeBadge rpeValue={workoutLog.rpe} />}
        <div className="text-right">{displayText}</div>
      </div>
    </Link>
  );
};

const HistoryItemGroup = ({
  date,
  workoutLogs = [],
}: {
  date: string;
  workoutLogs: WorkoutLog[];
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{date}</CardTitle>
    </CardHeader>
    <CardContent>
      {workoutLogs.map((workoutLog) => (
        <WorkoutHistoryItem key={workoutLog.id} workoutLog={workoutLog} />
      ))}
    </CardContent>
  </Card>
);
