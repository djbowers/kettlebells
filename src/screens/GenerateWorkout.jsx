import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const handlePressGenerate = () => {
    navigation.navigate(routes.Review);
  };

  return (
    <View style={tw`h-full bg-gray-700 py-4 flex justify-between items-center`}>
      <Text style={tw`text-white`} variant="headlineSmall">
        Let's get started!
      </Text>
      <Button mode="contained" onPress={handlePressGenerate}>
        Generate
      </Button>
    </View>
  );
};
