import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ROUTES } from './src/constants';
import { ExercisesContext } from './src/contexts';
import { useAirtableExercises } from './src/hooks';
import {
  ActiveWorkout,
  FinishedWorkout,
  GenerateWorkout,
  ReviewWorkout,
} from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const exercises = useAirtableExercises();

  return (
    <ExercisesContext.Provider
      value={{ exercises, activeWorkout, setActiveWorkout }}
    >
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={ROUTES.generate}>
            <Stack.Screen name={ROUTES.generate} component={GenerateWorkout} />
            <Stack.Screen name={ROUTES.review} component={ReviewWorkout} />
            <Stack.Screen name={ROUTES.active} component={ActiveWorkout} />
            <Stack.Screen name={ROUTES.finished} component={FinishedWorkout} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ExercisesContext.Provider>
  );
}
