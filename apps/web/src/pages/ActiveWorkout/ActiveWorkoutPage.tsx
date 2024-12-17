import { PauseIcon, PlayIcon, PlusIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogWorkout } from '~/api';
import { Page } from '~/components';
import { Button } from '~/components/ui/button';
import { useWorkoutOptions } from '~/contexts';
import { useTimer } from '~/hooks';

import {
  ActiveWorkoutControls,
  CompletedSection,
  CurrentMovement,
  WorkoutProgress,
} from './components';
import { useRequestWakeLock } from './hooks';

interface ActiveWorkoutPageProps {
  defaultPaused?: boolean;
  startedAt?: Date;
}

export const ActiveWorkoutPage = ({
  defaultPaused = true,
  startedAt = new Date(),
}: ActiveWorkoutPageProps) => {
  const [
    {
      bells,
      intervalTimer,
      isOneHanded,
      movements,
      repScheme,
      restTimer,
      workoutDetails,
      workoutGoal,
      workoutGoalUnits,
    },
  ] = useWorkoutOptions();

  const {
    mutate: logWorkout,
    data: workoutLogId,
    isLoading: logWorkoutLoading,
  } = useLogWorkout(startedAt);

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
  ] = useTimer(workoutGoal, {
    defaultPaused,
    disabled: workoutGoalUnits !== 'minutes',
  });

  const [
    formattedIntervalRemaining,
    {
      milliseconds: intervalRemainingMilliseconds,
      pause: pauseIntervalTimer,
      play: startIntervalTimer,
      reset: resetIntervalTimer,
    },
  ] = useTimer(intervalTimer / 60, { defaultPaused: true, timeFormat: 'ss.S' });

  const [
    formattedRestRemaining,
    {
      milliseconds: restRemainingMilliseconds,
      pause: pauseRestTimer,
      play: startRestTimer,
      reset: resetRestTimer,
    },
  ] = useTimer(restTimer / 60, { defaultPaused: true, timeFormat: 'ss.S' });

  const [
    formattedCountdownRemaining,
    {
      milliseconds: countdownRemainingMilliseconds,
      pause: pauseCountdownTimer,
      play: startCountdownTimer,
      reset: resetCountdownTimer,
    },
  ] = useTimer(3 / 60, { defaultPaused: true, timeFormat: 's.S' });

  const [currentMovementIndex, setCurrentMovementIndex] = useState<number>(0);
  const [completedRungs, setCompletedRungs] = useState<number>(0);
  const [completedReps, setCompletedReps] = useState<number>(0);

  const [isMirrorSet, setIsMirrorSet] = useState<boolean>(false); // for unilateral movements and mixed bells
  const [isEffectActive, setIsEffectActive] = useState<boolean>(false);
  const [isRestActive, setIsRestActive] = useState<boolean>(false);
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false);

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
  const shouldMirrorReps = (isSingleBell && isOneHanded) || isMixedBells;

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
    if (intervalTimer > 0) pauseIntervalTimer();
  };

  const finishRest = () => {
    pauseRestTimer();
    resetRestTimer();
    setIsRestActive(false);
    if (intervalTimer > 0) startIntervalTimer();
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

  const finishCountdown = () => {
    pauseCountdownTimer();
    setIsCountdownActive(false);
    resetCountdownTimer();
    startWorkoutTimer();
    if (intervalTimer > 0 && !isRestActive) startIntervalTimer();
    if (isRestActive) startRestTimer();
  };

  const handleClickContinue = () => {
    setIsEffectActive(true);
    continueWorkout();
  };

  const handleClickStart = () => {
    startCountdownTimer();
    setIsCountdownActive(true);
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

  useEffect(
    function handleCountdownTimer() {
      if (countdownRemainingMilliseconds === 0) finishCountdown();
    },
    [countdownRemainingMilliseconds],
  );

  return (
    <Page>
      <WorkoutProgress
        completedRounds={completedRounds}
        formattedTimeRemaining={formattedTimeRemaining}
        handleClickPause={handleClickPause}
        remainingMilliseconds={remainingMilliseconds}
        workoutGoal={workoutGoal}
        workoutGoalUnits={workoutGoalUnits}
        workoutTimerPaused={workoutTimerPaused}
      />

      <CurrentMovement
        currentRound={currentRound}
        currentMovement={currentMovement}
        isOneHanded={isOneHanded}
        workoutDetails={workoutDetails}
        rightBell={rightBell}
        leftBell={leftBell}
        repScheme={repScheme}
        rungIndex={rungIndex}
        restRemaining={isRestActive}
      />

      <ActiveWorkoutControls
        formattedCountdownRemaining={formattedCountdownRemaining}
        formattedIntervalRemaining={formattedIntervalRemaining}
        formattedRestRemaining={formattedRestRemaining}
        handleClickContinue={handleClickContinue}
        handleClickStart={handleClickStart}
        intervalCompletedPercentage={intervalCompletedPercentage}
        intervalTimer={intervalTimer}
        isCountdownActive={isCountdownActive}
        isEffectActive={isEffectActive}
        isRestActive={isRestActive}
        restCompletedPercentage={restCompletedPercentage}
        setIsEffectActive={setIsEffectActive}
        workoutTimerPaused={workoutTimerPaused}
      />

      <CompletedSection
        isBodyweight={isBodyweight}
        completedReps={completedReps}
        workoutVolume={workoutVolume}
      />

      <Button
        disabled={logWorkoutLoading}
        variant="outline"
        onClick={handleClickFinish}
      >
        Finish workout
      </Button>
    </Page>
  );
};
