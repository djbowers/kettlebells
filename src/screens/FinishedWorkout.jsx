import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { ROUTES } from '../constants';

export const FinishedWorkout = ({ navigation }) => {
  const handlePressHome = () => {
    navigation.navigate(ROUTES.generate);
  };

  return (
    <View>
      <Text>Congratulations!</Text>
      <Button mode="contained" onPress={handlePressHome}>
        Go Home
      </Button>
    </View>
  );
};
