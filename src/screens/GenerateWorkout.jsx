import { Button, Text, View } from 'react-native';
import tw from 'twrnc';

import { routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const handlePressGenerate = () => {
    navigation.navigate(routes.Review);
  };

  return (
    <View style={tw`h-full bg-gray-700 py-4 flex justify-between items-center`}>
      <Text style={tw`text-white`}>Let's get started!</Text>
      <Button
        title="Generate"
        color="darkorange"
        onPress={handlePressGenerate}
      />
    </View>
  );
};
