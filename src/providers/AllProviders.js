import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { theme } from '../theme';
import { ExercisesProvider } from './ExercisesProvider';

export const AllProviders = ({ children }) => {
  return (
    <ExercisesProvider>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>{children}</NavigationContainer>
      </NativeBaseProvider>
    </ExercisesProvider>
  );
};
