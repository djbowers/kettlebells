import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TAB_ROUTES } from '../constants';
import { HomeScreen, SettingsScreen } from '../screens';
import { WorkoutStack } from './WorkoutStack';

const Tab = createBottomTabNavigator();

const { workout, home, settings } = TAB_ROUTES;

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={workout}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={workout}
        component={WorkoutStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen name={home} component={HomeScreen} />
      <Tab.Screen name={settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};
