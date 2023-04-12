import { Button, Text } from 'native-base';
import { View } from 'react-native';
import tw from 'twrnc';

import { WORKOUT_ROUTES } from '../constants';

export const FinishedWorkoutScreen = ({ navigation, route }) => {
  const { duration } = route.params;

  const handlePressHome = () => {
    navigation.navigate(WORKOUT_ROUTES.generate);
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
