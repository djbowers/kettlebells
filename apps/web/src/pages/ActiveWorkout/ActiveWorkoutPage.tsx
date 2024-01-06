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
  const nextTaskIndex = isFinalTask ? 0 : currentTaskIndex + 1;
  const currentTask = tasks[currentTaskIndex];
  const nextTask = tasks[nextTaskIndex];

  // Bells
  const primaryBell = bells[0];
  const secondBell = bells[1];
  const singleBell = !secondBell;
  const primaryBellSide = isMirrorRung ? 'right' : 'left';
  const doubleBells = !singleBell;
  const mismatchedBells = doubleBells && primaryBell !== secondBell;

  // Volume
  const totalWeight = bells.reduce((total, bell) => total + bell, 0);
  const workoutVolume = completedReps * totalWeight;

  // Rungs
  const rungsPerRound = reps.length;
  const rungIndex = completedRungs % rungsPerRound;
  // const currentRung = rungIndex + 1;

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
    const { error, data: workoutLogs } = await supabase
      .from('workout_logs')
      .insert({
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
      })
      .select('id');

    if (error) console.error(error);
    else {
      const workoutLogId = workoutLogs[0].id;
      navigate(`/history/${workoutLogId}`);
    }
  };

  return (
    <Page>
      <Progress
        completedPercentage={completedPercentage}
        timeRemaining={timeRemaining}
      />

      <CurrentMovement
        currentRound={currentRound}
        currentTask={currentTask}
        nextTask={nextTask}
      />

      <CurrentRound
        rightBell={rightBell}
        leftBell={leftBell}
        reps={reps}
        rungIndex={rungIndex}
      />

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
          Continue
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

      <CompletedSection
        completedReps={completedReps}
        workoutVolume={workoutVolume}
      />

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
    <div className="bg-layout-darker relative flex h-5 w-full rounded-xl">
      <div
        className="bg-status-success h-5 rounded-xl"
        style={{ width: `${completedPercentage}%` }}
      />
      <div className="text-default absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium">
        {timeRemaining}
      </div>
    </div>
  );
};

export const CurrentMovement = ({
  currentRound,
  currentTask,
  nextTask,
}: {
  currentRound: number;
  currentTask: string;
  nextTask: string;
}) => {
  return (
    <div className="text-default flex gap-2 rounded-xl border px-2 py-3">
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-base font-semibold">Round</div>
        <div className="border-default relative h-6 w-6 rounded-full border">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold"
            data-testid="current-round"
          >
            {currentRound}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col justify-center gap-1">
        <div className="text-default text-2xl font-semibold">{currentTask}</div>
        {nextTask !== currentTask && (
          <>
            <hr className="border-default" />
            <div className="text-default text-base font-medium">
              Up Next: {nextTask}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CurrentRound = ({
  leftBell,
  rightBell,
  reps,
  rungIndex,
}: {
  leftBell: number | null;
  rightBell: number | null;
  reps: number[];
  rungIndex: number;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-subdued grid grid-cols-3 items-center gap-3 text-center uppercase">
        <div>Left</div>
        <div>Reps</div>
        <div>Right</div>
      </div>
      <div className="text-default grid grid-cols-3 items-center gap-3 text-center font-medium">
        {leftBell ? (
          <div className="flex h-full flex-col items-center justify-center py-1">
            <div className="text-5xl" data-testid="left-bell">
              {leftBell}
            </div>
            <div className="text-3xl">kg</div>
          </div>
        ) : (
          <div data-testid="left-bell" />
        )}

        <div
          className="flex h-full items-center justify-center py-1 text-6xl"
          data-testid="current-reps"
        >
          {reps[rungIndex]}
        </div>

        {rightBell ? (
          <div className="flex h-full flex-col items-center justify-center py-1">
            <div className="text-5xl" data-testid="right-bell">
              {rightBell}
            </div>
            <div className="text-3xl">kg</div>
          </div>
        ) : (
          <div data-testid="right-bell" />
        )}
      </div>
    </div>
  );
};

const CompletedSection = ({
  completedReps,
  workoutVolume,
}: {
  completedReps: number;
  workoutVolume: number;
}) => {
  return (
    <div
      className="text-default bg-layout-darker grid grid-cols-3 items-center space-x-2 space-y-1 rounded-lg p-2"
      data-testid="completed-section"
    >
      <div className="text-subdued col-span-1 justify-self-end text-lg font-medium uppercase">
        Completed
      </div>
      <div className="col-span-2" />

      <div className="col-span-1 justify-self-end text-lg font-medium uppercase">
        Reps
      </div>
      <div className="col-span-2 text-2xl font-medium">{completedReps}</div>

      <div className="col-span-1 justify-self-end text-lg font-medium uppercase">
        Volume
      </div>
      <div className="col-span-2 text-2xl font-medium">{workoutVolume}kg</div>
    </div>
  );
};
