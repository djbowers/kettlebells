import { useContext, useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { ROUTES } from '../constants';
import { ExercisesContext } from '../contexts';
import { useTimer } from '../hooks';

export const ActiveWorkout = ({ navigation, route }) => {
  const { activeWorkout } = useContext(ExercisesContext);

  const { duration, sets } = route.params;

  const numExercises = activeWorkout.length;
  const totalRounds = numExercises * sets;

  const seconds = useTimer();

  const [currentRound, setCurrentRound] = useState(1);

  const handlePressNext = () => {
    if (currentRound < totalRounds) setCurrentRound((prev) => prev + 1);
    else navigation.navigate(ROUTES.finished, { duration: seconds });
  };

  const rounds = activeWorkout.reduce((acc, exercise) => {
    const round = [];
    for (let i = 0; i < sets; i++) {
      round.push(exercise);
    }
    return [...acc, ...round];
  }, []);

  const currentExercise = rounds[currentRound - 1];

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <View style={tw`w-full items-center`}>
        <Text>Active Workout ({duration} minutes)</Text>
        <Text>Exercises: {numExercises}</Text>
        <Text>Total Rounds: {totalRounds}</Text>
        <Text>Current Round: {currentRound}</Text>
        <Text>Current Exercise: {currentExercise.name}</Text>
        <Text>Workout Duration: {seconds}</Text>
      </View>
      <Button mode="contained" onPress={handlePressNext}>
        Next Round
      </Button>
    </View>
  );
};
