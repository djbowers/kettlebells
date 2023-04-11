import { Button, Text } from 'native-base';
import { View } from 'react-native';
import tw from 'twrnc';

import { ROUTES } from '../constants';

export const FinishedWorkout = ({ navigation, route }) => {
  const { duration } = route.params;

  const handlePressHome = () => {
    navigation.navigate(ROUTES.generate);
  };

  return (
    <View style={tw`h-full p-7 flex justify-between items-center`}>
      <View style={tw`w-full flex items-center`}>
        <Text>Congratulations!</Text>
        <Text style={tw`mt-3`}>Completed workout in: {duration} seconds</Text>
      </View>
      <Button onPress={handlePressHome}>Go Home</Button>
    </View>
  );
};
