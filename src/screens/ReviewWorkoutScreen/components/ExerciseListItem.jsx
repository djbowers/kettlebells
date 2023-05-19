import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Badge, Flex, Spacer, Text } from 'native-base';

import { LEVELS } from '~/constants';

const LEVEL_COLORS = {
  [LEVELS[0]]: 'green.500',
  [LEVELS[1]]: 'yellow.500',
  [LEVELS[2]]: 'red.500',
};

export const ExerciseListItem = ({ variation, options }) => {
  const { name, level, exerciseName, movementPatterns, selectedGrip } =
    variation;
  const { sets, setLength, primaryFocus, secondaryFocus } = options;

  const levelColor = LEVEL_COLORS[level] || 'muted.500';

  return (
    <Flex id="Exercise List Item" direction="row" mb={1}>
      <Flex flexGrow={true}>
        <Flex id="Main Info" direction="row">
          <Text id="Variation Name" fontWeight="medium" fontSize="md">
            {name}
          </Text>
          <Spacer />
          <Text id="Level" color={levelColor} fontWeight="medium" fontSize="md">
            {level}
          </Text>
        </Flex>

        <Flex id="Grip" color="muted.500" fontSize="sm">
          <Text>{selectedGrip.name}</Text>
          <Flex direction="row">
            <Text id="Rep Range">8 - 12 reps per arm</Text>
            <Spacer />
            <Text id="Sets and Set Length">
              {sets} sets, {setLength} min each
            </Text>
          </Flex>
        </Flex>

        <Flex id="Movement Patterns" direction="row" mt={1}>
          {movementPatterns.map((movementPattern) => {
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

      <Flex id="Rearrange Icon" pl={1}>
        <Spacer />
        <MaterialCommunityIcons name="menu" size={20} />
        <Spacer />
      </Flex>
    </Flex>
  );
};
