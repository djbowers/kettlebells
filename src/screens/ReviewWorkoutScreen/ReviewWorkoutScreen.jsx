import { Badge, Button, Flex, Spacer, Text } from 'native-base';
import { useContext } from 'react';
import { ScrollView } from 'react-native';

import { ExerciseListItem } from '~/components';
import { WORKOUT_ROUTES } from '~/constants';
import { ActiveWorkoutContext } from '~/contexts';
import { generateWorkout } from '~/utils';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const [, setActiveWorkout] = useContext(ActiveWorkoutContext);

  const { options } = route.params;
  const { primaryFocus = '', secondaryFocus = '', sets, grip } = options;

  const activeWorkout = generateWorkout(options);

  const handlePressStart = () => {
    setActiveWorkout(activeWorkout);
    navigation.navigate(WORKOUT_ROUTES.active, {
      options,
    });
  };

  return (
    <Flex
      bgColor="layout.background"
      height="full"
      width="full"
      p={2}
      safeAreaTop
    >
      <Flex id="Header Section">
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
            <Flex id="Grip" direction="row" align>
              <Text fontWeight="medium" fontSize="md" mr={1}>
                Grip:
              </Text>
              <Text fontSize="md">{grip}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex flexGrow>
        <Text fontSize="xl" fontWeight="medium" mb={2}>
          {activeWorkout.length} Exercises
        </Text>
        <Flex id="Exercise List" px={2}>
          <ScrollView height={400}>
            {activeWorkout.map((variation) => (
              <ExerciseListItem
                key={variation.id}
                variation={variation}
                options={options}
              />
            ))}
          </ScrollView>
        </Flex>
      </Flex>

      <Button onPress={handlePressStart} size="xs">
        <Text fontWeight="medium" fontSize="md" color="white">
          Start Workout
        </Text>
      </Button>
    </Flex>
  );
};
