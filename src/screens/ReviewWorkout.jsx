import { useContext } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import tw from 'twrnc';

import { ExercisesContext } from '../contexts';

export const ReviewWorkout = ({ navigation }) => {
  const exercises = useContext(ExercisesContext);

  return (
    <View style={tw`h-full bg-gray-700 py-4 flex justify-between items-center`}>
      <Text style={tw`text-white`} variant="titleLarge">
        Workout
      </Text>
      <View style={tw`w-full flex-grow`}>
        <Text style={tw`text-white`} variant="titleMedium">
          {exercises.length} Exercises
        </Text>
        <Divider />
        <View>
          {exercises.map((exercise, i) => (
            <Text style={tw`text-white`} key={i} variant="bodyMedium">
              {exercise}
            </Text>
          ))}
        </View>
      </View>
      <Button mode="contained">Start Workout</Button>
    </View>
  );
};
