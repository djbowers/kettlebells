import { DateTime } from 'luxon';
import { useNavigate, useParams } from 'react-router-dom';

import { useWorkoutLog } from '~/api';
import { Button, Loading, Page } from '~/components';

export const CompletedWorkoutPage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { data: completedWorkout, loading } = useWorkoutLog(id);

  if (loading) return <Loading />;
  if (!completedWorkout) return <>Not Found</>;

  const displayDate = getDisplayDate(completedWorkout.date.toISOString());

  const workoutVolume =
    completedWorkout.completedReps *
    completedWorkout.bells.reduce((total, bell) => total + bell, 0);

  const repSchemeDisplayValue = completedWorkout.repScheme.reduce(
    (repScheme, rung) => {
      const unilateral = completedWorkout.bells[1] === 0;
      const rungDisplayValue = unilateral ? `${rung}/${rung}` : rung.toString();
      if (repScheme === '') return rungDisplayValue;
      return repScheme + ', ' + rungDisplayValue;
    },
    '',
  );

  const bellsDisplayValue = completedWorkout.bells.reduce(
    (bellWeights, bell) => {
      if (bellWeights === '') return bell.toString();
      return bellWeights + ', ' + bell;
    },
    '',
  );

  const handleClickContinue = () => {
    navigate('/history');
  };

  return (
    <Page>
      <div className="mt-5 flex flex-col gap-5">
        <div className="text-center">
          <div>⭐️</div>
          <div>Well Done!</div>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border p-2">
          <div>{displayDate}</div>

          <div className="flex justify-between">
            <div>⏱️ {completedWorkout.duration} min</div>
            <div>🔂 {repSchemeDisplayValue} reps</div>
            <div>🏋️ {bellsDisplayValue} kg</div>
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="text-subdued uppercase">Movements</div>

            {completedWorkout.tasks.map((movement) => {
              return <div key={movement}>{movement}</div>;
            })}
          </div>

          <div className="flex flex-col gap-0.5">
            <div className="text-subdued uppercase">Completed</div>

            <div className="flex justify-between">
              <div>🔁 {completedWorkout.completedRounds} rounds</div>
              <div>💪 {completedWorkout.completedReps} reps</div>
              <div>🏆 {workoutVolume} kg</div>
            </div>
          </div>
        </div>

        <Button
          className="mt-5 w-full"
          size="large"
          onClick={handleClickContinue}
        >
          Continue
        </Button>
      </div>
    </Page>
  );
};

export const getDisplayDate = (dateISOString: string) => {
  return DateTime.fromISO(dateISOString).toFormat('t, cccc, LLL dd y');
};
