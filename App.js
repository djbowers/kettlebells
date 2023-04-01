import { BASE_ID, PERSONAL_ACCESS_TOKEN } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { ExercisesContext } from './src/contexts';
import { GenerateWorkout, ReviewWorkout } from './src/screens';

const Stack = createNativeStackNavigator();

Airtable.configure({ apiKey: PERSONAL_ACCESS_TOKEN });

export default function App() {
  const [exercises, setExercises] = useState([]);

  const base = Airtable.base(BASE_ID);
  const table = base('Table 1');

  const fetchExercises = () => {
    table.select({ maxRecords: 250 }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const name = record.get('Name');
          setExercises((prev) => [...prev, name]);
        });
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  };

  useEffect(() => {
    if (exercises.length === 0) fetchExercises();
  }, []);

  return (
    <ExercisesContext.Provider value={exercises}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Generate">
            <Stack.Screen name="Generate" component={GenerateWorkout} />
            <Stack.Screen name="Review" component={ReviewWorkout} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ExercisesContext.Provider>
  );
}
