import { Badge, Flex, Spacer, Text } from 'native-base';

export const CurrentSetInfo = ({ currentExercise, isWarmup, options }) => {
  const { grip, primaryFocus, secondaryFocus } = options;
  const currentMovementPatterns = currentExercise.movementPatterns || [];

  return (
    <Flex w="full" my={2} aria-label="Current Set Info">
      <Flex direction="row">
        <Text fontSize="lg" fontWeight="semibold">
          {currentExercise.name}
        </Text>
        <Spacer />
        {/* todo: make this a reusable component */}
        <Flex id="Movement Patterns" direction="row" mt={1}>
          {currentMovementPatterns.map((movementPattern) => {
            let colorScheme;
            if (movementPattern === primaryFocus) colorScheme = 'primary';
            if (movementPattern === secondaryFocus) colorScheme = 'secondary';
            return (
              <Badge key={movementPattern} mr={1} colorScheme={colorScheme}>
                {movementPattern}
              </Badge>
            );
          })}
        </Flex>
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
