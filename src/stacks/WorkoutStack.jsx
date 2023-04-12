import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { WORKOUT_ROUTES } from '../constants';
import {
  ActiveWorkoutScreen,
  FinishedWorkoutScreen,
  GenerateWorkoutScreen,
  ReviewWorkoutScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const { generate, review, active, finished } = WORKOUT_ROUTES;

export const WorkoutStack = () => {
  return (
    <Stack.Navigator initialRouteName={generate}>
      <Stack.Screen name={generate} component={GenerateWorkoutScreen} />
      <Stack.Screen name={review} component={ReviewWorkoutScreen} />
      <Stack.Screen name={active} component={ActiveWorkoutScreen} />
      <Stack.Screen name={finished} component={FinishedWorkoutScreen} />
    </Stack.Navigator>
  );
};
