import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { ROUTES } from '../constants';

export const FinishedWorkout = ({ navigation }) => {
  const handlePressHome = () => {
    navigation.navigate(ROUTES.generate);
  };

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text>Congratulations!</Text>
      <Button mode="contained" onPress={handlePressHome}>
        Go Home
      </Button>
    </View>
  );
};
