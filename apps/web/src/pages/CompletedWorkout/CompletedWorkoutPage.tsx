import { DateTime } from 'luxon';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelectRPE, useUpdateWorkoutNotes, useWorkoutLog } from '~/api';
import { Loading, Page } from '~/components';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { useWorkoutOptions } from '~/contexts';
import { WorkoutLog } from '~/types';

import { Section } from '../StartWorkout/components';
import { RPESelector, WorkoutHistoryItem } from './components';

export const CompletedWorkoutPage = () => {
  const { id = '' } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [, updateWorkoutOptions] = useWorkoutOptions();

  const { data: completedWorkout, isLoading } = useWorkoutLog(id);
  const { mutate: selectRPE } = useSelectRPE(id);
  const { mutate: updateWorkoutNotes } = useUpdateWorkoutNotes(id);

  const notesRef = useRef<HTMLTextAreaElement>(null);

  if (isLoading) return <Loading />;
  if (!completedWorkout) return <>Not Found</>;

  const handleClickContinue = () => {
    navigate('/history');
  };

  const handleSelectRPE = (selectedRPE: WorkoutLog['rpe']) =>
    selectRPE(selectedRPE);

  const handleAddNotes = () => updateWorkoutNotes('');
  const handleClearNotes = () => updateWorkoutNotes(null);
  const handleBlurNotes = () =>
    updateWorkoutNotes(notesRef.current?.value || null);

  const handleClickRepeat = () => {
    updateWorkoutOptions({
      bells: [completedWorkout.bells[0], completedWorkout.bells[1]],
      intervalTimer: completedWorkout.intervalTimer,
      isOneHanded: completedWorkout.isOneHanded,
      movements: completedWorkout.movements,
      repScheme: completedWorkout.repScheme,
      restTimer: completedWorkout.restTimer,
      workoutDetails: completedWorkout.workoutDetails,
      workoutGoal: completedWorkout.workoutGoal,
      workoutGoalUnits: completedWorkout.workoutGoalUnits,
    });
    navigate('/');
  };

  return (
    <Page
      title="Workout Log"
      actions={
        <div className="flex gap-1">
          <Button variant="ghost" onClick={handleClickRepeat}>
            Repeat
          </Button>
          <Button onClick={handleClickContinue}>Continue</Button>
          {completedWorkout.workoutNotes === null && (
            <Button variant="ghost" onClick={handleAddNotes}>
              Add Notes
            </Button>
          )}
        </div>
      }
    >
      <WorkoutHistoryItem
        bells={completedWorkout.bells}
        completedAt={completedWorkout.completedAt}
        completedReps={completedWorkout.completedReps}
        completedRounds={completedWorkout.completedRounds}
        intervalTimer={completedWorkout.intervalTimer}
        isOneHanded={completedWorkout.isOneHanded}
        movements={completedWorkout.movements}
        repScheme={completedWorkout.repScheme}
        restTimer={completedWorkout.restTimer}
        startedAt={completedWorkout.startedAt}
        workoutDetails={completedWorkout.workoutDetails}
        workoutGoal={completedWorkout.workoutGoal}
        workoutGoalUnits={completedWorkout.workoutGoalUnits}
      />
      <RPESelector
        onSelectRPE={handleSelectRPE}
        rpeValue={completedWorkout.rpe}
      />
      {completedWorkout.workoutNotes !== null && (
        <Section
          title="Workout Notes"
          actions={
            completedWorkout.workoutNotes?.length > 0 && (
              <Button variant="secondary" size="sm" onClick={handleClearNotes}>
                Clear Notes
              </Button>
            )
          }
        >
          <Textarea
            aria-label="Workout Notes"
            className="w-full"
            defaultValue={completedWorkout.workoutNotes}
            onBlur={handleBlurNotes}
            ref={notesRef}
          />
        </Section>
      )}
    </Page>
  );
};
