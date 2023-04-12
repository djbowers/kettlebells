import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ROUTES } from '../constants';
import {
  ActiveWorkoutScreen,
  FinishedWorkoutScreen,
  GenerateWorkoutScreen,
  ReviewWorkoutScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

export const WorkoutStack = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.generate}>
      <Stack.Screen name={ROUTES.generate} component={GenerateWorkoutScreen} />
      <Stack.Screen name={ROUTES.review} component={ReviewWorkoutScreen} />
      <Stack.Screen name={ROUTES.active} component={ActiveWorkoutScreen} />
      <Stack.Screen name={ROUTES.finished} component={FinishedWorkoutScreen} />
    </Stack.Navigator>
  );
};
