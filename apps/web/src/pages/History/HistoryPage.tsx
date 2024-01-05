import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import { useWorkoutLogs } from '~/api';
import { Loading, Page } from '~/components';

export const HistoryPage = () => {
  const { data: workoutLogs, loading } = useWorkoutLogs();

  const navigate = useNavigate();

  if (loading) return <Loading />;

  return (
    <Page>
      <div className="text-default flex flex-col gap-2">
        <div className="text-xl font-bold">History</div>
        <div className="text-subdued text-md grid grid-cols-4 px-2 font-medium uppercase">
          <div>Date</div>
          <div className="col-span-2">Movements</div>
          <div className="text-right">Volume</div>
        </div>
        {workoutLogs
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map((workoutLog) => {
            const formattedWorkoutDate = DateTime.fromJSDate(
              workoutLog.date,
            ).toFormat('MM-d ccc');

            const totalWeight = workoutLog.bells.reduce(
              (total, bell) => total + bell,
              0,
            );
            const workoutVolume = workoutLog.completedReps * totalWeight;

            const handleClick = () => {
              navigate('/history/' + workoutLog.id);
            };

            return (
              <div
                key={workoutLog.id}
                className="hover:bg-layout-darker grid grid-cols-4 rounded-xl px-2 py-1 hover:cursor-pointer"
                onClick={handleClick}
              >
                <div>{formattedWorkoutDate}</div>
                <div className="col-span-2">
                  {workoutLog.tasks.map((task, i) => (
                    <div key={i}>{task}</div>
                  ))}
                  {workoutLog.notes && (
                    <div className="text-subdued">{workoutLog.notes}</div>
                  )}
                </div>
                <div className="text-right">{workoutVolume.toFixed(0)} kg</div>
              </div>
            );
          })}
      </div>
    </Page>
  );
};
