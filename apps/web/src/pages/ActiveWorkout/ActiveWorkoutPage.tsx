import { PauseIcon, PlayIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogWorkout } from '~/api';
import { Button, IconButton, Page } from '~/components';
import { useWorkoutOptions } from '~/contexts';
import { useTimer } from '~/hooks';

import {
  CompletedSection,
  CurrentMovement,
  CurrentRound,
  ProgressBar,
} from './components';
import { useRequestWakeLock } from './hooks';

interface Props {
  startedAt?: Date;
}

export const ActiveWorkoutPage = ({ startedAt = new Date() }: Props) => {
  const [
    { bells, duration, intervalTimer, movements, notes, repScheme, restTimer },
  ] = useWorkoutOptions();

  const { mutate: logWorkout, data: workoutLogId } = useLogWorkout(startedAt);

  const navigate = useNavigate();
  const requestWakeLock = useRequestWakeLock();

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

  const finishInterval = () => {
    continueWorkout();
    resetIntervalTimer();
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

  const handleClickFinish = () => {
    logWorkout({
      completedReps,
      completedRounds,
      completedRungs,
    });
  };

  useEffect(
    function handleFinishInterval() {
      if (intervalTimer === 0) return;
      if (intervalRemainingMilliseconds === 0) finishInterval();
    },
    [intervalRemainingMilliseconds],
  );

  useEffect(
    function handleFinishRest() {
      if (restTimer === 0) return;
      if (restRemainingMilliseconds === 0) finishRest();
    },
    [restRemainingMilliseconds],
  );

  useEffect(
    function handlePageRefresh() {
      if (movements[0] === '') navigate('/'); // todo: handle page refresh with local storage
    },
    [movements],
  );

  useEffect(
    function handleFinishWorkout() {
      if (workoutLogId) navigate(`/history/${workoutLogId}`);
    },
    [workoutLogId],
  );

  return (
    <Page>
      <div className="flex w-full items-center gap-1">
        <ProgressBar
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
        notes={notes}
      />

      <CurrentRound
        rightBell={rightBell}
        leftBell={leftBell}
        repScheme={repScheme}
        rungIndex={rungIndex}
        restRemaining={isRestActive}
      />

      {intervalTimer > 0 && !isRestActive && (
        <ProgressBar
          color="success"
          completedPercentage={intervalCompletedPercentage}
          size="large"
          text="interval"
          timeRemaining={parseFloat(formattedIntervalRemaining).toFixed(1)}
        />
      )}

      {isRestActive && (
        <ProgressBar
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
