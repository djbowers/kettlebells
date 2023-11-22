import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import { Loading, Page } from '~/components';
import { supabase } from '~/supabaseClient';

interface WorkoutLog {
  bells: number[];
  completedReps: number;
  date: Date;
  duration: number;
  id: number;
  notes: string | null;
  repScheme: number[];
  tasks: string[];
}

export const HistoryPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);

  useEffect(() => {
    async function getTrainingHistory() {
      setLoading(true);

      let { data: workout_logs, error } = await supabase
        .from('workout_logs')
        .select(`*`);

      if (error) {
        console.warn(error);
      } else if (workout_logs) {
        setWorkoutLogs(
          workout_logs.map((workout_log) => {
            return {
              bells: workout_log.bells,
              completedReps: workout_log.completed_reps,
              date: new Date(workout_log.started_at),
              duration: workout_log.minutes,
              id: workout_log.id,
              notes: workout_log.notes,
              repScheme: workout_log.reps,
              tasks: workout_log.tasks,
            };
          }),
        );
      }

      setLoading(false);
    }

    getTrainingHistory();
  }, []);

  return (
    <Page>
      {loading ? (
        <Loading />
      ) : (
        <div className="text-default flex flex-col gap-2">
          <div className="text-xl font-bold">History</div>
          <div className="text-md grid grid-cols-4 font-semibold">
            <div>Date</div>
            <div className="col-span-2">Skill(s)</div>
            <div className="text-center">
              Density
              <br />
              (kg/min)
            </div>
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
              const workoutDensity = workoutVolume / workoutLog.duration;

              return (
                <div key={workoutLog.id} className="grid grid-cols-4">
                  <div>{formattedWorkoutDate}</div>
                  <div className="col-span-2">
                    {workoutLog.tasks.map((task, i) => (
                      <div key={i}>{task}</div>
                    ))}
                    {workoutLog.notes && (
                      <div className="text-subdued">{workoutLog.notes}</div>
                    )}
                  </div>
                  <div className="text-center">{workoutDensity}</div>
                </div>
              );
            })}
        </div>
      )}
    </Page>
  );
};
