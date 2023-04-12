import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import { useState } from 'react';

import { ROUTES } from './src/constants';
import { ExercisesContext } from './src/contexts';
import { useAirtableExercises } from './src/hooks';
import {
  ActiveWorkoutScreen,
  FinishedWorkoutScreen,
  GenerateWorkoutScreen,
  ReviewWorkoutScreen,
} from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const exercises = useAirtableExercises();

  return (
    <ExercisesContext.Provider
      value={{ exercises, activeWorkout, setActiveWorkout }}
    >
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.generate}>
            <Stack.Screen
              name={ROUTES.generate}
              component={GenerateWorkoutScreen}
            />
            <Stack.Screen
              name={ROUTES.review}
              component={ReviewWorkoutScreen}
            />
            <Stack.Screen
              name={ROUTES.active}
              component={ActiveWorkoutScreen}
            />
            <Stack.Screen
              name={ROUTES.finished}
              component={FinishedWorkoutScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ExercisesContext.Provider>
  );
}
