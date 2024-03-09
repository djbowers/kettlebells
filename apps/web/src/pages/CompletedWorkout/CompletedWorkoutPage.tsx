import { DateTime } from 'luxon';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelectRPE, useWorkoutLog } from '~/api';
import { Loading, Page } from '~/components';
import { Button } from '~/components/ui/button';
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
      intervalTimer: completedWorkout.intervalTimer,
      restTimer: completedWorkout.restTimer,
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
          onSelectRPE={handleSelectRPE}
          rpeValue={completedWorkout.rpe}
        />

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={handleClickRepeat}>
            Repeat
          </Button>
          <Button onClick={handleClickContinue}>Continue</Button>
        </div>
      </div>
    </Page>
  );
};

export const getDisplayDate = (dateISOString: string) => {
  return DateTime.fromISO(dateISOString).toFormat('t, cccc, LLL dd y');
};
