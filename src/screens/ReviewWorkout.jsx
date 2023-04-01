import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import tw from 'twrnc';

import { LEVELS_MAP } from '../constants';
import { ExercisesContext } from '../contexts';

export const ReviewWorkout = ({ route }) => {
  const exercises = useContext(ExercisesContext);

  const { level } = route.params;
  const levels = LEVELS_MAP[level];

  const workoutExercises = exercises.filter((exercise) =>
    levels.includes(exercise.level)
  );

  return (
    <View style={tw`h-full bg-gray-700 py-4 flex justify-between items-center`}>
      <Text style={tw`text-white`} variant="titleLarge">
        Workout
      </Text>
      <View style={tw`w-full flex-grow`}>
        <Text style={tw`text-white`} variant="titleMedium">
          {workoutExercises.length} Exercises
        </Text>
        <Divider />
        <View>
          {workoutExercises.map((exercise, i) => (
            <Text style={tw`text-white`} key={i} variant="bodyMedium">
              {exercise.name}
            </Text>
          ))}
        </View>
      </View>
      <Button mode="contained">Start Workout</Button>
    </View>
  );
};
