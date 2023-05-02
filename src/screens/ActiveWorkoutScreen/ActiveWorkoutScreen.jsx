import { Box, Button, Flex, Progress, Spacer, Text } from 'native-base';
import { useContext, useState } from 'react';

import { WARMUP, WARMUP_DURATION, WORKOUT_ROUTES } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { useTimer } from '~/hooks';

export const ActiveWorkoutScreen = ({ navigation, route }) => {
  const { activeWorkout } = useContext(ExercisesContext);

  const { duration, sets, setLength } = route.params;

  const numExercises = activeWorkout.length;
  const totalRounds = numExercises * sets;

  const [elapsedTime] = useTimer();
  const [elapsedInSet, { resetTimer }] = useTimer();

  const [currentRound, setCurrentRound] = useState(0);

  const handlePressNext = () => {
    if (currentRound < totalRounds) {
      resetTimer();
      setCurrentRound((prev) => prev + 1);
    } else {
      navigation.navigate(WORKOUT_ROUTES.finished, {
        duration: elapsedTime,
      });
    }
  };

  const rounds = activeWorkout.reduce(
    (rounds, exercise) => {
      const round = [];
      for (let i = 0; i < sets; i++) {
        round.push(exercise);
      }
      return [...rounds, ...round];
    },
    [WARMUP]
  );

  const currentExercise = rounds[currentRound];
  const currentExerciseNumber = activeWorkout.indexOf(currentExercise) + 1;

  const isWarmup = currentExercise.id === 'warmup';

  const roundLength = isWarmup ? WARMUP_DURATION : setLength;

  const remaining = roundLength * 60 - elapsedInSet;

  return (
    <Flex alignItems="center" height="full" width="full" px={8} safeAreaTop>
      <Box w="100%">
        <Progress value={currentRound} max={totalRounds} size="2xl" />
      </Box>
      <Flex flexDir="row" py={2}>
        <Text fontSize="md">
          {elapsedTime} / {duration}m
        </Text>
        <Spacer />
        <Text fontSize="md">
          {isWarmup
            ? 'Warmup'
            : `Exercise ${currentExerciseNumber} / ${numExercises}`}
        </Text>
      </Flex>

      <Text>
        {numExercises} movements in {duration} min
      </Text>
      <Text>
        Round {currentRound} of {totalRounds}
      </Text>
      <Text>Current Exercise: {currentExercise.name}</Text>
      <Text>Remaining in Set: {remaining}</Text>

      <Button onPress={handlePressNext}>Next Round</Button>
    </Flex>
  );
};
