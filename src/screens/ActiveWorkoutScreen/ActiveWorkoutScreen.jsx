import { Box, Button, Center, Progress, Text } from 'native-base';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';

import { WORKOUT_ROUTES } from '~/constants';
import { ExercisesContext } from '~/contexts';
import { useTimer } from '~/hooks';

export const ActiveWorkoutScreen = ({ navigation, route }) => {
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
      navigation.navigate(WORKOUT_ROUTES.finished, {
        duration: workoutDuration,
      });
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
        <Center w="100%">
          <Box w="90%" maxW="400">
            <Progress value={currentRound} max={totalRounds} mx="4" />
          </Box>
        </Center>
        <Text>Current Exercise: {currentExercise.name}</Text>
        <Text>Remaining in Set: {remaining}</Text>
      </View>
      <Button onPress={handlePressNext}>Next Round</Button>
    </View>
  );
};
