import { Flex, Spacer, Text } from 'native-base';

export const CurrentSetInfo = ({ currentExercise, isWarmup, grip }) => {
  const currentMovementPatterns = currentExercise.movementPatterns || [];

  const currentMovementPatternsText =
    currentMovementPatterns.length > 1
      ? currentMovementPatterns.join(' + ')
      : currentMovementPatterns[0];

  return (
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
  );
};
