import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { GenerateWorkoutScreen } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Generate">
        <Stack.Screen name="Generate" component={GenerateWorkoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
