import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { useState } from 'react';

import { ExercisesContext } from './src/contexts';
import { useAirtableExercises } from './src/hooks';
import { HomeScreen, SettingsScreen } from './src/screens';
import { WorkoutStack } from './src/stacks';

const Tab = createBottomTabNavigator();

export default function App() {
  const [activeWorkout, setActiveWorkout] = useState(null);
  const exercises = useAirtableExercises();

  return (
    <ExercisesContext.Provider
      value={{ exercises, activeWorkout, setActiveWorkout }}
    >
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Workout" component={WorkoutStack} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ExercisesContext.Provider>
  );
}
