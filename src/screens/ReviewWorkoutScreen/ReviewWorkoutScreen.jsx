import { Button, Divider, Text } from 'native-base';
import { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import tw from 'twrnc';

import { WORKOUT_ROUTES } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { useGenerateWorkout } from '~/hooks';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const { setActiveWorkout } = useContext(ExercisesContext);

  const { options } = route.params;
  const { duration, focus, setLength, sets, grip } = options;

  const activeWorkout = useGenerateWorkout(options);

  const handlePressStart = () => {
    setActiveWorkout(activeWorkout);
    navigation.navigate(WORKOUT_ROUTES.active, { duration, sets, setLength });
  };

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text style={tw`mb-3`} fontSize="lg">
        {activeWorkout.length} Exercises - {focus} Focus
      </Text>
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
    </View>
  );
};
