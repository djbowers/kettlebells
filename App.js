import { PERSONAL_ACCESS_TOKEN } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Airtable from 'airtable';
import { Provider as PaperProvider } from 'react-native-paper';

import { GenerateWorkout, ReviewWorkout } from './src/screens';

const Stack = createNativeStackNavigator();

Airtable.configure({ apiKey: PERSONAL_ACCESS_TOKEN });

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Generate">
          <Stack.Screen name="Generate" component={GenerateWorkout} />
          <Stack.Screen name="Review" component={ReviewWorkout} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
