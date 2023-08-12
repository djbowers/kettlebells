import { Flex } from 'native-base';
import { useContext, useState } from 'react';

import { WARMUP, WORKOUT_ROUTES } from '~/constants';
import { ActiveWorkoutContext } from '~/contexts';
import { useTimer } from '~/hooks';

import { CurrentSetInfo, WorkoutControls, WorkoutProgress } from './components';

export const ActiveWorkoutScreen = ({ navigation, route }) => {
  const [activeWorkout] = useContext(ActiveWorkoutContext);

  const [currentRound, setCurrentRound] = useState(0);

  const [elapsedTime] = useTimer();

  const { options } = route.params;
  const { duration, sets, setLength, grip } = options;

  const rounds = activeWorkout.reduce(
    (rounds, exercise) => {
      const round = [];
      for (let i = 0; i < sets; i++) {
        round.push(exercise);
      }
      return [...rounds, ...round];
    },
    [WARMUP],
  );

  const numExercises = activeWorkout.length;
  const totalRounds = numExercises * sets;
  const currentExercise = rounds[currentRound];
  const isWarmup = currentExercise.id === 'warmup';

  const handleFinishWorkout = () =>
    navigation.navigate(WORKOUT_ROUTES.finished, {
      duration: elapsedTime,
    });

  return (
    <Flex
      bgColor="layout.background"
      alignItems="center"
      height="full"
      width="full"
      px={8}
      safeAreaTop
    >
      <WorkoutProgress
        activeWorkout={activeWorkout}
        duration={duration}
        elapsedTime={elapsedTime}
        currentExercise={currentExercise}
        currentRound={currentRound}
        isWarmup={isWarmup}
        numExercises={numExercises}
        totalRounds={totalRounds}
      />

      <CurrentSetInfo
        currentExercise={currentExercise}
        isWarmup={isWarmup}
        options={options}
      />

      <WorkoutControls
        currentRound={currentRound}
        isWarmup={isWarmup}
        onFinishWorkout={handleFinishWorkout}
        setCurrentRound={setCurrentRound}
        sets={sets}
        setLength={setLength}
        totalRounds={totalRounds}
      />
    </Flex>
  );
};
