import { Button, Flex, Text } from 'native-base';
import { useContext } from 'react';
import { ScrollView } from 'react-native';

import { WORKOUT_ROUTES } from '~/constants';
import { ActiveWorkoutContext } from '~/contexts';
import { generateWorkout } from '~/utils';

import {
  ExerciseList,
  HeaderSection,
  MovementPatternPoints,
} from './components';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const [, setActiveWorkout] = useContext(ActiveWorkoutContext);

  const { options = {} } = route.params;
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
      <HeaderSection options={options} />
      <ExerciseList activeWorkout={activeWorkout} options={options} />
      <MovementPatternPoints activeWorkout={activeWorkout} options={options} />
      <Flex alignItems="center">
        <Button onPress={handlePressStart} size="xs">
          <Text fontWeight="medium" fontSize="md" color="white">
            Start Workout
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};
