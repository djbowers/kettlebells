import { Badge, Flex, Text } from 'native-base';

export const WorkoutOverview = ({ options }) => {
  const { primaryFocus = '', secondaryFocus = '' } = options;

  return (
    <Flex id="Workout Overview">
      <Text fontSize="2xl" fontWeight="medium" mb={2}>
        Workout Overview
      </Text>
      <Flex id="Workout Info" pl={2} mb={2}>
        <Flex id="Focus" direction="row">
          <Text fontWeight="medium" fontSize="md" mr={1}>
            Focus:
          </Text>
          {primaryFocus && (
            <Badge mr={1} colorScheme="primary">
              {primaryFocus.toUpperCase()}
            </Badge>
          )}
          {secondaryFocus && (
            <Badge mr={1} colorScheme="secondary">
              {secondaryFocus.toUpperCase()}
            </Badge>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
