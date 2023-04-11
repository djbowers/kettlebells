import { Button, Text } from 'native-base';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

import { ROUTES } from '../constants';
import { ExercisesContext } from '../contexts';
import { useTimer } from '../hooks';

export const ActiveWorkout = ({ navigation, route }) => {
  const { activeWorkout } = useContext(ExercisesContext);

  const { duration, sets, setLength } = route.params;

  const numExercises = activeWorkout.length;
  const totalRounds = numExercises * sets;

  const [workoutDuration] = useTimer();
  const [setDuration, { resetTimer }] = useTimer();

  const [currentRound, setCurrentRound] = useState(1);

  const handlePressNext = () => {
    if (currentRound < totalRounds) {
      resetTimer();
      setCurrentRound((prev) => prev + 1);
    } else {
      navigation.navigate(ROUTES.finished, { duration: workoutDuration });
    }
  };

  const rounds = activeWorkout.reduce((acc, exercise) => {
    const round = [];
    for (let i = 0; i < sets; i++) {
      round.push(exercise);
    }
    return [...acc, ...round];
  }, []);

  const currentExercise = rounds[currentRound - 1];
  const remaining = setLength * 60 - setDuration;

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <View style={tw`w-full items-center`}>
        <Text>Workout Duration: {workoutDuration}</Text>
        <Text>
          {numExercises} movements in {duration} min
        </Text>
        <Text>
          Round {currentRound} of {totalRounds}
        </Text>
        <Text>Current Exercise: {currentExercise.name}</Text>
        <Text>Remaining in Set: {remaining}</Text>
      </View>
      <Button onPress={handlePressNext}>Next Round</Button>
    </View>
  );
};
