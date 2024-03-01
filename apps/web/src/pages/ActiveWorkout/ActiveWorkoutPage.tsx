import { PauseIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWakeLock } from 'react-screen-wake-lock';

import { Button, IconButton, Page } from '~/components';
import { useSession, useWorkoutOptions } from '~/contexts';
import { useTimer } from '~/hooks';
import { supabase } from '~/supabaseClient';

interface Props {
  startedAt?: Date;
}

export const ActiveWorkoutPage = ({ startedAt = new Date() }: Props) => {
  const [workoutOptions] = useWorkoutOptions();
  const {
    bells,
    duration,
    intervalTimer,
    movements,
    notes,
    repScheme,
    restTimer,
  } = workoutOptions;

  const { isSupported, release, released, request } = useWakeLock();
  const locked = released === false;

  const requestWakeLock = async () => {
    if (!isSupported) return;
    if (!locked) await request();
  };

  const releaseWakeLock = async () => {
    if (!isSupported) return;
    if (locked) await release();
  };

  useEffect(() => {
    requestWakeLock();
    return () => {
      releaseWakeLock();
    };
  }, []);

  const navigate = useNavigate();

  const { user } = useSession();

  const [
    formattedTimeRemaining,
    {
      milliseconds: remainingMilliseconds,
      pause: pauseWorkoutTimer,
      paused: workoutTimerPaused,
      play: startWorkoutTimer,
    },
  ] = useTimer(duration);

  const [
    formattedIntervalRemaining,
    {
      milliseconds: intervalRemainingMilliseconds,
      pause: pauseIntervalTimer,
      play: startIntervalTimer,
      reset: resetIntervalTimer,
    },
  ] = useTimer(intervalTimer / 60, { timeFormat: 'ss.S' });

  const [
    formattedRestRemaining,
    {
      milliseconds: restRemainingMilliseconds,
      pause: pauseRestTimer,
      play: startRestTimer,
      reset: resetRestTimer,
    },
  ] = useTimer(restTimer / 60, { defaultPaused: true, timeFormat: 'ss.S' });

  const [currentMovementIndex, setCurrentMovementIndex] = useState<number>(0);
  const [completedRungs, setCompletedRungs] = useState<number>(0);
  const [completedReps, setCompletedReps] = useState<number>(0);

  const [isMirrorSet, setIsMirrorSet] = useState<boolean>(false);
  const [isEffectActive, setIsEffectActive] = useState<boolean>(false);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);

  // Overview
  const totalMilliseconds = duration * 60000;
  const completedPercentage =
    ((totalMilliseconds - remainingMilliseconds) / totalMilliseconds) * 100;

  // Movements
  const lastMovementIndex = movements.length - 1;
  const isLastMovement = currentMovementIndex === lastMovementIndex;
  const currentMovement = movements[currentMovementIndex];

  // Bells
  const primaryBellSide = isMirrorSet ? 'right' : 'left'; // todo: make primary bell side configurable
  const primaryBellWeight = bells[0];
  const secondaryBellWeight = bells[1];
  const isSingleBell = primaryBellWeight > 0 && secondaryBellWeight === 0;
  const isDoubleBells = primaryBellWeight > 0 && secondaryBellWeight > 0;
  const isMixedBells =
    isDoubleBells && primaryBellWeight !== secondaryBellWeight;

  // Volume
  const totalWeight = bells.reduce((total, bell) => total + bell, 0);
  const isBodyweight = totalWeight === 0;
  const workoutVolume = completedReps * totalWeight;

  // Rungs
  const rungsPerRound = repScheme.length;
  const rungIndex = completedRungs % rungsPerRound;

  // Rounds
  const completedRounds = Math.floor(completedRungs / rungsPerRound);
  const currentRound = completedRounds + 1;
  const shouldMirrorReps = isSingleBell || isMixedBells;

  const leftBell = useMemo(() => {
    if (primaryBellSide === 'left') return primaryBellWeight;
    else return isSingleBell ? null : secondaryBellWeight;
  }, [primaryBellSide, isSingleBell]);

  const rightBell = useMemo(() => {
    if (primaryBellSide === 'right') return primaryBellWeight;
    else return isSingleBell ? null : secondaryBellWeight;
  }, [primaryBellSide, isSingleBell]);

  // Interval Timer
  const totalIntervalMilliseconds = intervalTimer * 1000;
  const intervalCompletedPercentage =
    ((totalIntervalMilliseconds - intervalRemainingMilliseconds) /
      totalIntervalMilliseconds) *
    100;

  // Rest Timer
  const totalRestMilliseconds = restTimer * 1000;
  const restCompletedPercentage =
    ((totalRestMilliseconds - restRemainingMilliseconds) /
      totalRestMilliseconds) *
    100;

  const incrementReps = () => {
    setCompletedReps((prev) => prev + repScheme[rungIndex]);
  };

  const incrementRungs = () => {
    setCompletedRungs((prev) => prev + 1);
  };

  const goToNextMovement = () => {
    if (isLastMovement) {
      setCurrentMovementIndex(0);
      incrementRungs();
    } else {
      setCurrentMovementIndex((prev) => prev + 1);
    }
  };

  /** Continue to the next side of the body for unilateral movements, or swap bells for mixed weights. */
  const goToNextSide = () => {
    if (isMirrorSet) {
      setIsMirrorSet(false);
      goToNextMovement();
    } else {
      setIsMirrorSet(true);
    }
  };

  const goToNextSet = () => {
    if (shouldMirrorReps) {
      goToNextSide();
    } else {
      goToNextMovement();
    }
  };

  const startRest = () => {
    setIsRestActive(true);
    startRestTimer();
  };

  const finishRest = () => {
    pauseRestTimer();
    resetRestTimer();
    setIsRestActive(false);
  };

  const continueWorkout = () => {
    requestWakeLock();
    incrementReps();
    goToNextSet();
    if (restTimer > 0) startRest();
  };

  const handleClickContinue = () => {
    setIsEffectActive(true);
    continueWorkout();
  };

  const handleClickPlay = () => {
    startWorkoutTimer();
    startIntervalTimer();
    if (isRestActive) startRestTimer();
  };

  const handleClickPause = () => {
    pauseWorkoutTimer();
    pauseIntervalTimer();
    if (isRestActive) pauseRestTimer();
  };

  const handleClickFinish = async () => {
    const { error, data: workoutLogs } = await supabase
      .from('workout_logs')
      .insert({
        bells,
        completed_reps: completedReps,
        completed_rounds: completedRounds,
        completed_rungs: completedRungs,
        interval_timer: intervalTimer,
        minutes: duration,
        movements,
        notes,
        rep_scheme: repScheme,
        rest_timer: restTimer,
        started_at: startedAt.toISOString(),
        user_id: user.id,
      })
      .select('id');

    if (error) console.error(error);
    else {
      const workoutLogId = workoutLogs[0].id;
      navigate(`/history/${workoutLogId}`);
    }
  };

  /** Interval Timer Effect */
  useEffect(() => {
    if (intervalTimer === 0) return;
    if (intervalRemainingMilliseconds === 0) {
      continueWorkout();
      resetIntervalTimer();
    }
  }, [intervalRemainingMilliseconds]);

  /** Rest Timer Effect */
  useEffect(() => {
    if (restTimer === 0) return;
    if (restRemainingMilliseconds === 0) {
      finishRest();
    }
  });

  /** Return to start workout page on refresh */
  useEffect(() => {
    if (movements[0] === '') {
      navigate('/');
    }
  }, [movements]);

  return (
    <Page>
      <div className="flex w-full items-center gap-1">
        <Progress
          completedPercentage={completedPercentage}
          text="remaining"
          timeRemaining={duration > 0 ? formattedTimeRemaining : <>&infin;</>}
        />

        {duration > 0 && (
          <div>
            {workoutTimerPaused ? (
              <IconButton
                onClick={handleClickPlay}
                kind="outline"
                size="large"
                className={clsx({
                  'bg-layout-darker': workoutTimerPaused,
                })}
              >
                <PlayIcon className="h-3 w-3" />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleClickPause}
                kind="outline"
                size="large"
                className={clsx({
                  'bg-layout-darker': workoutTimerPaused,
                })}
              >
                <PauseIcon className="h-3 w-3" />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <CurrentMovement
        currentRound={currentRound}
        currentMovement={currentMovement}
      />

      <CurrentRound
        rightBell={rightBell}
        leftBell={leftBell}
        repScheme={repScheme}
        rungIndex={rungIndex}
        restRemaining={isRestActive}
      />

      {intervalTimer > 0 && !isRestActive && (
        <Progress
          color="success"
          completedPercentage={intervalCompletedPercentage}
          size="large"
          text="interval"
          timeRemaining={parseFloat(formattedIntervalRemaining).toFixed(1)}
        />
      )}

      {isRestActive && (
        <Progress
          color="warning"
          completedPercentage={restCompletedPercentage}
          size="large"
          text="rest"
          timeRemaining={parseFloat(formattedRestRemaining).toFixed(1)}
        />
      )}

      {intervalTimer === 0 && !isRestActive && (
        <Button
          className={clsx('grow', { 'animate-wiggle': isEffectActive })}
          disabled={workoutTimerPaused}
          leftIcon={<PlusIcon className="h-3 w-3" />}
          onAnimationEnd={() => setIsEffectActive(false)}
          onClick={handleClickContinue}
          size="large"
        >
          Continue
        </Button>
      )}

      <CompletedSection
        isBodyweight={isBodyweight}
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
  color = 'success',
  completedPercentage,
  size = 'default',
  text,
  timeRemaining,
}: {
  color?: 'success' | 'warning';
  completedPercentage: number;
  size?: 'default' | 'large';
  text?: string;
  timeRemaining: ReactNode;
}) => {
  return (
    <div
      className={clsx('bg-layout-darker relative flex w-full rounded-xl', {
        'h-5': size === 'default',
        'h-6': size === 'large',
      })}
    >
      <div
        className={clsx('rounded-xl', {
          // Color
          'bg-status-success': color === 'success',
          'bg-status-warning': color === 'warning',

          // Size
          'h-5': size === 'default',
          'h-6': size === 'large',
        })}
        style={{ width: `${completedPercentage}%` }}
      />
      <div
        className={clsx(
          'text-default absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 font-mono font-medium',
          {
            'text-xl': size === 'default',
            'text-3xl': size === 'large',
          },
        )}
      >
        {timeRemaining}
      </div>
      {text && (
        <span className="text-subdued absolute right-0 top-1/2 mr-2 -translate-y-1/2 text-sm uppercase">
          {text}
        </span>
      )}
    </div>
  );
};

export const CurrentMovement = ({
  currentMovement,
  currentRound,
}: {
  currentMovement: string;
  currentRound: number;
}) => {
  return (
    <div className="text-default flex gap-2 rounded-xl border px-2 py-3">
      <div className="flex flex-col items-center gap-0.5">
        <div className="text-subdued text-sm font-semibold uppercase">
          Round
        </div>
        <div className="bg-layout-darker relative h-6 w-6 rounded-full">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-semibold"
            data-testid="current-round"
          >
            {currentRound}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col justify-center gap-1">
        <div className="text-default text-center text-2xl font-semibold">
          {currentMovement}
        </div>
      </div>
    </div>
  );
};

const CurrentRound = ({
  leftBell,
  repScheme,
  rightBell,
  rungIndex,
  restRemaining,
}: {
  leftBell: number | null;
  repScheme: number[];
  rightBell: number | null;
  rungIndex: number;
  restRemaining: boolean;
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-subdued grid grid-cols-3 items-center gap-3 text-center text-sm font-semibold uppercase">
        <div>Left</div>
        <div>Reps</div>
        <div>Right</div>
      </div>
      <div className="text-default grid grid-cols-3 items-center gap-3 text-center font-medium">
        {leftBell && !restRemaining ? (
          <div className="flex items-end justify-center gap-1">
            <div className="text-5xl" data-testid="left-bell">
              {leftBell}
            </div>
            <div className="text-subdued text-xl">kg</div>
          </div>
        ) : (
          <div data-testid="left-bell" />
        )}

        <div
          className="flex items-end justify-center text-5xl"
          data-testid="current-reps"
        >
          {restRemaining ? <span className="h-5" /> : repScheme[rungIndex]}
        </div>

        {rightBell && !restRemaining ? (
          <div className="flex items-end justify-center gap-1">
            <div className="text-5xl" data-testid="right-bell">
              {rightBell}
            </div>
            <div className="text-subdued text-xl">kg</div>
          </div>
        ) : (
          <div data-testid="right-bell" />
        )}
      </div>
    </div>
  );
};

const CompletedSection = ({
  isBodyweight,
  completedReps,
  workoutVolume,
}: {
  isBodyweight: boolean;
  completedReps: number;
  workoutVolume: number;
}) => {
  return (
    <div
      className="text-default bg-layout-darker flex flex-col gap-x-2 gap-y-1 rounded-lg p-2"
      data-testid="completed-section"
    >
      <div className="text-subdued text-sm font-semibold uppercase">
        Completed
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="basis-1/2 text-right text-base font-semibold uppercase">
          {isBodyweight ? 'Reps' : 'Volume'}
        </div>
        <div className="basis-1/2 text-3xl font-medium">
          {isBodyweight ? completedReps : workoutVolume}
        </div>
      </div>
    </div>
  );
};
