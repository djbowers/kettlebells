import { Box, Button, Flex, Progress, Spacer, Text } from 'native-base';
import { useContext, useState } from 'react';

import { WARMUP, WARMUP_DURATION, WORKOUT_ROUTES } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { useTimer } from '~/hooks';

export const ActiveWorkoutScreen = ({ navigation, route }) => {
  const { activeWorkout, movementPatterns } = useContext(ExercisesContext);

  const { duration, sets, setLength, grip } = route.params;

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
  const currentMovementPatternIds = currentExercise.movementPatterns || [];
  const currentMovementPatterns = movementPatterns
    .filter(({ id }) => currentMovementPatternIds.includes(id))
    .map(({ name }) => name);
  const currentMovementPatternsText =
    currentMovementPatterns.length > 1
      ? currentMovementPatterns.join(' + ')
      : currentMovementPatterns[0];

  const isWarmup = currentExercise.id === 'warmup';
  const roundLength = isWarmup ? WARMUP_DURATION : setLength;
  const remaining = roundLength * 60 - elapsedInSet;

  return (
    <Flex alignItems="center" height="full" width="full" px={8} safeAreaTop>
      <Box w="full" my={2}>
        <Progress value={currentRound} max={totalRounds} size="2xl" />
        <Flex direction="row" py={2}>
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
      </Box>

      <Flex w="full" mb={2}>
        <Flex direction="row">
          <Text fontSize="lg" fontWeight="semibold">
            {currentExercise.name}
          </Text>
          <Spacer />
          <Text fontSize="md">{currentMovementPatternsText}</Text>
        </Flex>
        {!isWarmup && (
          <Flex direction="row">
            {currentExercise.aka && (
              <Text fontSize="sm">aka {currentExercise.aka}</Text>
            )}
            <Spacer />
            <Flex>
              <Text fontSize="sm">{grip}</Text>
              <Text>Aim for 8 - 12 reps per arm</Text>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Button onPress={handlePressNext}>Next Round</Button>
    </Flex>
  );
};
