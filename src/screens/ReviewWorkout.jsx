import { useContext, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import tw from 'twrnc';

import { LEVELS_MAP } from '../constants';
import {
  SINGLE_EXERCISE_DURATION,
  WARMUP_DURATION,
} from '../constants/duration';
import { ExercisesContext } from '../contexts';
import { shuffleArray } from '../utils';

export const ReviewWorkout = ({ route }) => {
  const exercises = useContext(ExercisesContext);

  const { duration, focus, level, sets } = route.params;
  const levels = LEVELS_MAP[level];

  const filteredExercises = exercises.filter(
    (exercise) => levels.includes(exercise.level) && exercise.focus === focus
  );

  shuffleArray(filteredExercises);

  const remainingRef = useRef(duration - WARMUP_DURATION);

  const workoutExercises = filteredExercises.reduce((acc, exercise) => {
    if (remainingRef.current > 0) {
      remainingRef.current -= SINGLE_EXERCISE_DURATION * sets;
      return [...acc, exercise];
    }
    return acc;
  }, []);

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text style={tw`mb-3`} variant="titleMedium">
        {workoutExercises.length} Exercises - {focus} Focus
      </Text>

      <Divider />

      <ScrollView>
        {workoutExercises.map(({ id, name }) => (
          <Text key={id} style={tw`text-center`} variant="bodyMedium">
            {name} x {sets}
          </Text>
        ))}
      </ScrollView>

      <Button mode="contained">Start Workout</Button>
    </View>
  );
};
