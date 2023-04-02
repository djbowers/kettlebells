import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { ROUTES } from '../constants';
import { ExercisesContext } from '../contexts';

export const ActiveWorkout = ({ navigation, route }) => {
  const { activeWorkout } = useContext(ExercisesContext);

  const { duration, sets } = route.params;

  const numExercises = activeWorkout.length;
  const totalRounds = numExercises * sets;

  const [currentRound, setCurrentRound] = useState(1);

  const handlePressNext = () => {
    if (currentRound < totalRounds) setCurrentRound((prev) => prev + 1);
    else navigation.navigate(ROUTES.finished);
  };

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <View style={tw`w-full items-center`}>
        <Text>Active Workout ({duration} minutes)</Text>
        <Text>Exercises: {numExercises}</Text>
        <Text>Total Rounds: {totalRounds}</Text>
        <Text>Current Round: {currentRound}</Text>
        {activeWorkout.map((exercise) => (
          <Text key={exercise.id}>{exercise.name}</Text>
        ))}
      </View>
      <Button mode="contained" onPress={handlePressNext}>
        Next Round
      </Button>
    </View>
  );
};
