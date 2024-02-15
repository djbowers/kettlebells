import { DateTime } from 'luxon';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelectRPE, useWorkoutLog } from '~/api';
import { Button, Loading, Page } from '~/components';
import { useWorkoutOptions } from '~/contexts';
import { WorkoutLog } from '~/types';

import { RPESelector, WorkoutHistoryItem } from './components';

export const CompletedWorkoutPage = () => {
  const { id = '' } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [, updateWorkoutOptions] = useWorkoutOptions();

  const { data: completedWorkout, isLoading } = useWorkoutLog(id);
  const { mutate: selectRPE } = useSelectRPE(id);

  if (isLoading) return <Loading />;
  if (!completedWorkout) return <>Not Found</>;

  const handleClickContinue = () => {
    navigate('/history');
  };

  const handleSelectRPE = (selectedRPE: WorkoutLog['rpe']) => {
    selectRPE(selectedRPE);
  };

  const handleClickRepeat = () => {
    updateWorkoutOptions({
      bells: [completedWorkout.bells[0], completedWorkout.bells[1]],
      duration: completedWorkout.duration,
      movements: completedWorkout.movements,
      notes: completedWorkout.notes || '',
      repScheme: completedWorkout.repScheme,
      intervalTimer: 0,
    });
    navigate('/');
  };

  return (
    <Page>
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <div>⭐️</div>
          <div>Well Done!</div>
        </div>

        <WorkoutHistoryItem completedWorkout={completedWorkout} />

        <RPESelector
          bellWeights={completedWorkout.bells}
          onSelectRPE={handleSelectRPE}
          repScheme={completedWorkout.repScheme}
          rpeValue={completedWorkout.rpe}
        />

        <Button kind="outline" size="large" onClick={handleClickRepeat}>
          Repeat
        </Button>

        <Button size="large" onClick={handleClickContinue}>
          Continue
        </Button>
      </div>
    </Page>
  );
};

export const getDisplayDate = (dateISOString: string) => {
  return DateTime.fromISO(dateISOString).toFormat('t, cccc, LLL dd y');
};
