import { Flex, ScrollView, Text } from 'native-base';

import { ExerciseListItem } from './ExerciseListItem';

export const ExerciseList = ({ activeWorkout, options }) => {
  return (
    <Flex id="Exercise List" flexGrow>
      <Text fontSize="xl" fontWeight="medium" mb={2}>
        {activeWorkout.length} Exercises
      </Text>
      <ScrollView h={200}>
        <Flex id="Exercise List" px={2}>
          {activeWorkout.map((variation) => (
            <ExerciseListItem
              key={variation.id}
              variation={variation}
              options={options}
            />
          ))}
        </Flex>
      </ScrollView>
    </Flex>
  );
};
