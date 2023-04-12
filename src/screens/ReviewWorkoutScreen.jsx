import { Button, Divider, Text } from 'native-base';
import { useContext, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import tw from 'twrnc';

import { LEVELS_MAP, ROUTES } from '../constants';
import { WARMUP_DURATION } from '../constants/duration';
import { ExercisesContext } from '../contexts';
import { shuffleArray } from '../utils';

export const ReviewWorkoutScreen = ({ navigation, route }) => {
  const { exercises, setActiveWorkout } = useContext(ExercisesContext);

  const { duration, focus, level, sets, setLength } = route.params;

  const levels = LEVELS_MAP[level];

  const filteredExercises = exercises.filter(
    (exercise) => levels.includes(exercise.level) && exercise.focus === focus
  );

  shuffleArray(filteredExercises);

  const remainingRef = useRef(duration - WARMUP_DURATION);

  const workoutExercises = filteredExercises.reduce((exercises, exercise) => {
    if (remainingRef.current > 0) {
      remainingRef.current -= setLength * sets;
      return [...exercises, exercise];
    }
    return exercises;
  }, []);

  const handlePressStart = () => {
    setActiveWorkout(workoutExercises);
    navigation.navigate(ROUTES.active, { duration, sets, setLength });
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
