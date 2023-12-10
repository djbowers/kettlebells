import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/20/solid';
import { PauseIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWakeLock } from 'react-screen-wake-lock';

import { Button, IconButton, Page } from '~/components';
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
  const { isSupported, release, released, request } = useWakeLock();
  const locked = released === false;

  const handleRequestWakeLock = async () => {
    if (!isSupported) return;
    if (!locked) await request();
  };

  const handleReleaseWakeLock = async () => {
    if (!isSupported) return;
    if (locked) await release();
  };

  useEffect(() => {
    handleRequestWakeLock();
    return () => {
      handleReleaseWakeLock();
    };
  }, []);

  const navigate = useNavigate();

  const { user } = useSession();

  const [timeRemaining, { seconds, togglePause, paused }] = useTimer(minutes);

  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [completedRungs, setCompletedRungs] = useState<number>(0);
  const [completedReps, setCompletedReps] = useState<number>(0);
  const [isMirrorRung, setMirrorRung] = useState<boolean>(false);
  const [effect, setEffect] = useState(false);

  // Overview
  const totalSeconds = minutes * 60;
  const completedPercentage = ((totalSeconds - seconds) / totalSeconds) * 100;

  // Tasks
  const tasksPerRung = tasks.length;
  const finalTaskIndex = tasksPerRung - 1;
  const isFinalTask = currentTaskIndex === finalTaskIndex;

  // Bells
  const primaryBell = bells[0];
  const secondBell = bells[1];
  const singleBell = !secondBell;
  const primaryBellSide = isMirrorRung ? 'right' : 'left';
  const doubleBells = !singleBell;
  const mismatchedBells = doubleBells && primaryBell !== secondBell;

  // Rungs
  const rungsPerRound = reps.length;
  const rungIndex = completedRungs % rungsPerRound;
  const currentRung = rungIndex + 1;

  // Rounds
  const completedRounds = Math.floor(completedRungs / rungsPerRound);
  const currentRound = completedRounds + 1;
  const rungsMirrored = singleBell || mismatchedBells;

  const leftBell = useMemo(() => {
    if (primaryBellSide === 'left') return primaryBell;
    else return singleBell ? null : secondBell;
  }, [primaryBellSide, singleBell]);

  const rightBell = useMemo(() => {
    if (primaryBellSide === 'right') return primaryBell;
    else return singleBell ? null : secondBell;
  }, [primaryBellSide, singleBell]);

  const handleIncrementRungs = () => {
    if (isFinalTask) {
      setCurrentTaskIndex(0);
      setCompletedRungs((prev) => prev + 1);
    } else {
      setCurrentTaskIndex((prev) => prev + 1);
    }
  };

  const handleClickPlus = () => {
    setEffect(true);
    handleRequestWakeLock();
    setCompletedReps((prev) => prev + reps[rungIndex]); // always increment reps

    if (rungsMirrored) {
      if (isMirrorRung) {
        setMirrorRung(false);
        handleIncrementRungs();
      } else {
        setMirrorRung(true);
      }
    } else {
      handleIncrementRungs();
    }
  };

  const handleClickPlayPause = () => togglePause();

  const handleClickFinish = async () => {
    const { error } = await supabase.from('workout_logs').insert({
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
      <Progress
        completedPercentage={completedPercentage}
        timeRemaining={timeRemaining}
      />

      <div className="flex flex-col space-y-1">
        <div className="flex flex-col">
          <div className="text-default text-2xl font-medium">
            {tasks[currentTaskIndex]}
          </div>
          <div className="text-subdued text-lg">{notes}</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 py-4">
        <div className="text-default text-2xl font-medium">
          Round {currentRound} {rungsPerRound > 1 && `Rung ${currentRung}`}
        </div>
        <div className="text-default flex w-full justify-between">
          <div data-testid="left-bell">{leftBell && `${leftBell} kg`}</div>
          <div data-testid="right-bell">{rightBell && `${rightBell} kg`}</div>
        </div>
        <div className="text-default text-6xl font-medium">
          {reps[rungIndex]} <span className="text-2xl">reps</span>
        </div>

        <div className="flex w-full items-center gap-1">
          <Button
            className={clsx('grow', { 'animate-wiggle': effect })}
            onClick={handleClickPlus}
            onAnimationEnd={() => setEffect(false)}
            aria-label="Add Reps"
            size="large"
            disabled={paused}
            leftIcon={<PlusIcon className="h-3 w-3" />}
          >
            Next Round
          </Button>
          <IconButton
            onClick={handleClickPlayPause}
            kind="outline"
            size="large"
            className={clsx({
              'bg-layout-darker': paused,
            })}
          >
            {paused ? (
              <PlayIcon className="h-3 w-3" />
            ) : (
              <PauseIcon className="h-3 w-3" />
            )}
          </IconButton>
        </div>
        <div className="text-md text-default">
          Completed {completedRungs} {rungsPerRound > 1 ? 'rungs' : 'rounds'}{' '}
          and {completedReps} reps
        </div>
      </div>

      <Button kind="outline" onClick={handleClickFinish} className="h-5">
        <div className="uppercase">Finish Workout</div>
      </Button>
    </Page>
  );
};

const Progress = ({
  completedPercentage,
  timeRemaining,
}: {
  completedPercentage: number;
  timeRemaining: string;
}) => {
  return (
    <div className="bg-layout-darker relative flex h-5 w-full rounded">
      <div
        className="bg-status-success h-5 rounded"
        style={{ width: `${completedPercentage}%` }}
      />
      <div className="text-default absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium">
        {timeRemaining}
      </div>
    </div>
  );
};
