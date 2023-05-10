import { Badge, Button, Flex, Spacer, Text } from 'native-base';
import { useContext } from 'react';
import { ScrollView } from 'react-native';

import { MOVEMENT_PATTERNS, WORKOUT_ROUTES } from '~/constants';
import { ActiveWorkoutContext } from '~/contexts';
import { generateWorkout } from '~/utils';

import { ExerciseListItem } from './components';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const [, setActiveWorkout] = useContext(ActiveWorkoutContext);

  const { options = {} } = route.params;
  const { primaryFocus = '', secondaryFocus = '', grip } = options;

  const activeWorkout = generateWorkout(options);

  const handlePressStart = () => {
    setActiveWorkout(activeWorkout);
    navigation.navigate(WORKOUT_ROUTES.active, {
      options,
    });
  };

  const movementPatternPoints = activeWorkout.reduce((points, variation) => {
    for (const movementPattern of MOVEMENT_PATTERNS) {
      if (!Object.keys(points).includes(movementPattern)) {
        points[movementPattern] = 0;
      }

      if (variation.movementPatterns.includes(movementPattern)) {
        points[movementPattern] += 1;
      }
    }
    return points;
  }, {});

  return (
    <ScrollView>
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

        <Flex id="Exercise List" flexGrow>
          <Text fontSize="xl" fontWeight="medium" mb={2}>
            {activeWorkout.length} Exercises
          </Text>
          <Flex id="Exercise List" px={2}>
            {activeWorkout.map((variation) => (
              <ExerciseListItem
                key={variation.id}
                variation={variation}
                options={options}
              />
            ))}
          </Flex>
        </Flex>

        <Flex id="Movement Pattern Points" alignItems="center" mb={2}>
          <Text fontWeight="medium" fontSize="md" mb={1}>
            Movement Patterns
          </Text>
          <Flex direction="row" alignItems="center">
            <Spacer />
            {Object.entries(movementPatternPoints).map(
              ([movementPattern, points]) => {
                let color;
                if (movementPattern === primaryFocus) color = 'primary.700';
                if (movementPattern === secondaryFocus) color = 'secondary.700';
                return (
                  points > 0 && (
                    <>
                      <Text fontSize="sm" fontWeight="medium" color={color}>
                        {movementPattern}: {points}
                      </Text>
                      <Spacer />
                    </>
                  )
                );
              }
            )}
          </Flex>
        </Flex>

        <Flex alignItems="center">
          <Button onPress={handlePressStart} size="xs">
            <Text fontWeight="medium" fontSize="md" color="white">
              Start Workout
            </Text>
          </Button>
        </Flex>
      </Flex>
    </ScrollView>
  );
};
