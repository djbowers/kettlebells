import { PlayPauseIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Page } from '~/components';
import { useSession } from '~/contexts';
import { useTimer } from '~/hooks';
import { supabase } from '~/supabaseClient';
import { WorkoutOptions } from '~/types';

interface Props {
  startedAt: Date;
  workoutOptions: WorkoutOptions;
}

export const ActiveWorkout = ({
  startedAt = new Date(),
  workoutOptions: { tasks, reps, notes, minutes, bells },
}: Props) => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [timeRemaining, { seconds, togglePause }] = useTimer(minutes);
  const [completedRungs, setCompletedRungs] = useState<number>(0);
  const [completedReps, setCompletedReps] = useState<number>(0);
  const [rungDoubled, setRungDoubled] = useState<boolean>(false);
  const [effect, setEffect] = useState(false);

  // Overview
  const totalSeconds = minutes * 60;
  const completedPercentage = ((totalSeconds - seconds) / totalSeconds) * 100;

  // Bells
  const primaryBell = bells[0];
  const secondBell = bells[1];
  const singleBell = !secondBell;
  const primaryBellSide = !rungDoubled ? 'left' : 'right';
  const doubleBells = !singleBell;
  const mismatchedBells = doubleBells && primaryBell !== secondBell;

  // Rungs
  const rungsPerRound = reps.length;
  const rungIndex = completedRungs % rungsPerRound;
  const currentRung = rungIndex + 1;

  // Rounds
  const completedRounds = Math.floor(completedRungs / rungsPerRound);
  const currentRound = completedRounds + 1;
  const roundsDoubled = singleBell || mismatchedBells;

  const getLeftBell = () => {
    if (primaryBellSide === 'left') return primaryBell;
    if (singleBell) return null;
    else return secondBell;
  };

  const getRightBell = () => {
    if (primaryBellSide === 'right') return primaryBell;
    if (singleBell) return null;
    else return secondBell;
  };

  const leftBell = getLeftBell();
  const rightBell = getRightBell();

  const handleClickPlus = () => {
    setEffect(true);
    setCompletedReps((prev) => (prev += reps[rungIndex]));

    if (!roundsDoubled) setCompletedRungs((prev) => (prev += 1));
    else {
      if (!rungDoubled) setRungDoubled(true);
      else {
        setRungDoubled(false);
        setCompletedRungs((prev) => (prev += 1));
      }
    }
  };

  const handleClickPlayPause = () => togglePause();

  const handleClickFinish = async () => {
    const { error } = await supabase.from('practices').insert({
      started_at: startedAt.toISOString(),
      user_id: user.id,
      tasks,
      notes,
      minutes,
      reps,
      completed_rounds: completedRounds,
      completed_reps: completedReps,
      completed_rungs: completedRungs,
      bells,
    });
    if (error) console.error(error);
    else navigate('/history');
  };

  return (
    <Page>
      <Progress completedPercentage={completedPercentage} />

      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-medium">
            {tasks[0]} <span className="text-lg text-gray-500">{notes}</span>
          </div>
          <div>{timeRemaining}</div>
        </div>

        <Button
          className="flex w-full items-center justify-center border border-gray-700 py-1"
          onClick={handleClickPlayPause}
        >
          <PlayPauseIcon className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 py-4">
        <div className="text-2xl font-medium">
          Round {currentRound} {rungsPerRound > 1 && `Rung ${currentRung}`}
        </div>
        <div className="flex w-full justify-between">
          <div data-testid="left-bell">{leftBell && `${leftBell} kg`}</div>
          <div data-testid="right-bell">{rightBell && `${rightBell} kg`}</div>
        </div>
        <div className="text-6xl font-medium">
          {reps[rungIndex]} <span className="text-2xl">reps</span>
        </div>
        <Button
          className={clsx(
            'flex w-full items-center justify-center bg-blue-500 py-1',
            { 'animate-wiggle': effect },
          )}
          onClick={handleClickPlus}
          onAnimationEnd={() => setEffect(false)}
          aria-label="Add Reps"
        >
          <PlusIcon className="h-4 w-4 font-bold" />
        </Button>
        <div className="text-md">
          Completed {completedRungs} {rungsPerRound > 1 ? 'rungs' : 'rounds'}{' '}
          and {completedReps} reps
        </div>
      </div>

      <div>
        <Button
          className="flex w-full items-center justify-center border border-gray-700 py-1"
          onClick={handleClickFinish}
        >
          <div className="uppercase">Finish Workout</div>
        </Button>
      </div>
    </Page>
  );
};

const Progress = ({ completedPercentage }: { completedPercentage: number }) => {
  return (
    <div className="h-5 w-full rounded bg-neutral-900">
      <div
        className="h-5 rounded bg-green-400"
        style={{ width: `${completedPercentage}%` }}
      />
    </div>
  );
};
