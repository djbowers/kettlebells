import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';

import { ExercisesProvider } from './ExercisesProvider';

export const AllProviders = ({ children }) => {
  return (
    <ExercisesProvider>
      <NativeBaseProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </NativeBaseProvider>
    </ExercisesProvider>
  );
};
