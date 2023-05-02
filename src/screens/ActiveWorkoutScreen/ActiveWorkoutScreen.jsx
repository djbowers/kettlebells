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
  const [elapsedInSet, { resetTimer, seconds: elapsedSecondsInSet }] =
    useTimer();

  const [currentRound, setCurrentRound] = useState(0);

  const handlePressPrev = () => {
    if (currentRound > 0) {
      resetTimer();
      setCurrentRound((prev) => prev - 1);
    }
  };

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
      <Box w="full" my={2} aria-label="Screen Header">
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

      <Flex w="full" my={2} aria-label="Current Set Info">
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

      <Flex w="full" my={2} aria-label="Workout Controls">
        <Text mb={2} textAlign="center">
          Set 1 / 4
        </Text>
        <Progress
          value={elapsedSecondsInSet}
          max={setLength * 60}
          size="2xl"
          colorScheme="secondary"
        />
        <Flex direction="row" my={2}>
          <Text fontSize="md">{elapsedInSet}</Text>
          <Spacer />
          <Text fontSize="md">{setLength}m</Text>
        </Flex>
        <Flex direction="row" my={2}>
          <Spacer />
          <Button
            onPress={handlePressPrev}
            size="md"
            variant="ghost"
            colorScheme="muted"
          >
            <Text fontWeight="medium">PREV</Text>
          </Button>
          <Spacer />
          <Button
            size="md"
            variant="solid"
            colorScheme="primary"
            onPress={handlePressNext}
          >
            <Text fontWeight="medium" color="white">
              NEXT
            </Text>
          </Button>
          <Spacer />
        </Flex>
      </Flex>
    </Flex>
  );
};
