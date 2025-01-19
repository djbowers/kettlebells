import { ArrowRightIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useDeleteWorkoutLog,
  useSelectRPE,
  useUpdateWorkoutNotes,
  useWorkoutLog,
} from '~/api';
import { Loading, Page } from '~/components';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Textarea } from '~/components/ui/textarea';
import { useWorkoutOptions } from '~/contexts';
import { WorkoutLog } from '~/types';

import { Section } from '../StartWorkoutPage/components';
import { RPESelector, WorkoutHistoryItem } from './components';

export const CompletedWorkoutPage = () => {
  const { id = '' } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const [, updateWorkoutOptions] = useWorkoutOptions();

  const { data: completedWorkout, isLoading } = useWorkoutLog(id);
  const {
    mutate: deleteWorkoutLog,
    data: deletedWorkoutLogId,
    isLoading: isDeletingWorkoutLog,
  } = useDeleteWorkoutLog(id);
  const { mutate: selectRPE } = useSelectRPE(id);
  const { mutate: updateWorkoutNotes } = useUpdateWorkoutNotes(id);

  const notesRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (deletedWorkoutLogId) navigate('/history');
  }, [deletedWorkoutLogId]);

  if (isLoading) return <Loading />;
  if (!completedWorkout) return <>Not Found</>;

  const handleClickContinue = () => navigate('/history');

  const handleClickDelete = () => deleteWorkoutLog();

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
    <Dialog>
      <Page
        title="Workout Log"
        actions={
          <div className="flex flex-col items-center gap-1">
            <div className="grid grid-cols-3 gap-1">
              <Button variant="ghost" onClick={handleClickRepeat}>
                Repeat
              </Button>
              <Button
                onClick={handleClickContinue}
                className="flex items-center gap-0.5"
              >
                Continue
                <ArrowRightIcon className="h-2 w-2" />
              </Button>
              {completedWorkout.workoutNotes === null && (
                <Button variant="ghost" onClick={handleAddNotes}>
                  Add Notes
                </Button>
              )}
            </div>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-0.5 text-red-500"
              >
                Delete <TrashIcon className="h-2.5 w-2.5" />
              </Button>
            </DialogTrigger>
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
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleClearNotes}
                >
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

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            workout log.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleClickDelete}
            variant="destructive"
            loading={isDeletingWorkoutLog}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
