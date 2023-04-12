import { Button, Divider, Text } from 'native-base';
import { useContext, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import tw from 'twrnc';

import { WARMUP_DURATION, WORKOUT_ROUTES } from '../constants';
import { ExercisesContext } from '../contexts';
import { generateWorkout } from '../utils';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const { exercises, setActiveWorkout } = useContext(ExercisesContext);

  const { duration, focus, level, sets, setLength } = route.params;

  const remainingRef = useRef(duration - WARMUP_DURATION);

  const workoutExercises = generateWorkout(
    exercises,
    { level, focus, setLength, sets },
    remainingRef.current
  );

  const handlePressStart = () => {
    setActiveWorkout(workoutExercises);
    navigation.navigate(WORKOUT_ROUTES.active, { duration, sets, setLength });
  };

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text style={tw`mb-3`} fontSize="lg">
        {workoutExercises.length} Exercises - {focus} Focus
      </Text>

      <Divider my={3} />

      <ScrollView>
        {workoutExercises.map(({ id, name }) => (
          <Text key={id} style={tw`text-center`} fontSize="sm">
            {name} x {sets}
          </Text>
        ))}
      </ScrollView>

      <Button onPress={handlePressStart}>Start Workout</Button>
    </View>
  );
};
