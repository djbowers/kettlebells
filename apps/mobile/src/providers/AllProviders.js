import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { theme } from '../theme';
import { ActiveWorkoutProvider } from './ActiveWorkoutProvider';

export const AllProviders = ({ children }) => {
  const inset = {
    frame: { x: 0, y: 0, width: 0, height: 0 },
    insets: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  return (
    <ActiveWorkoutProvider>
      <NativeBaseProvider theme={theme} initialWindowMetrics={inset}>
        <NavigationContainer>{children}</NavigationContainer>
      </NativeBaseProvider>
    </ActiveWorkoutProvider>
  );
};
