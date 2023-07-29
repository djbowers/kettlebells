import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TAB_ROUTES } from '../constants';
import { HistoryScreen } from '../screens';
import { WorkoutStack } from './WorkoutStack';

const Tab = createBottomTabNavigator();

const { workout, history } = TAB_ROUTES;

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
            <MaterialCommunityIcons
              name="kettlebell"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={history}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="calendar-check"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
