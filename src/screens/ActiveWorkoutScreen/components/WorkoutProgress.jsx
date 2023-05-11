import { Box, Flex, Progress, Spacer, Text } from 'native-base';

export const WorkoutProgress = ({
  activeWorkout,
  duration,
  elapsedTime,
  currentExercise,
  currentRound,
  isWarmup,
  numExercises,
  totalRounds,
}) => {
  const currentExerciseNumber = activeWorkout.indexOf(currentExercise) + 1;

  return (
    <Box w="full" my={2} aria-label="Screen Header">
      <Progress value={currentRound} max={totalRounds} size="2xl" />
      <Flex direction="row" py={2}>
        <Text fontSize="md">
          {elapsedTime} / {duration}m
        </Text>
        <Spacer />
        <Text fontSize="md">
          {!isWarmup && `Exercise ${currentExerciseNumber} / ${numExercises}`}
        </Text>
      </Flex>
    </Box>
  );
};
