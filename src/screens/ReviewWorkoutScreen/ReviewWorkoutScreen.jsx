import { Button, Divider, Flex, Text } from 'native-base';
import { useContext } from 'react';
import { ScrollView } from 'react-native';
import tw from 'twrnc';

import { WORKOUT_ROUTES } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { useGenerateWorkout } from '~/hooks';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const { setActiveWorkout } = useContext(ExercisesContext);

  const { options } = route.params;
  const { duration, primaryFocus, secondaryFocus, setLength, sets, grip } =
    options;

  const activeWorkout = useGenerateWorkout(options);

  const handlePressStart = () => {
    setActiveWorkout(activeWorkout);
    navigation.navigate(WORKOUT_ROUTES.active, { duration, sets, setLength });
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={7}
      height="full"
      safeAreaTop
    >
      <Text style={tw`mb-3`} fontSize="lg">
        {activeWorkout.length} Exercises
      </Text>
      <Text>Primary Focus: {primaryFocus}</Text>
      {secondaryFocus && <Text>Secondary Focus: {secondaryFocus}</Text>}
      <Text>{grip}</Text>

      <Divider my={3} />

      <ScrollView>
        {activeWorkout.map(({ id, name }) => (
          <Text key={id} style={tw`text-center`} fontSize="sm">
            {name} x {sets}
          </Text>
        ))}
      </ScrollView>

      <Button onPress={handlePressStart}>Start Workout</Button>
    </Flex>
  );
};
