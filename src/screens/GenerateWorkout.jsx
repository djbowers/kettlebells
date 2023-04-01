import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { LEVEL_OPTIONS, routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelValue, setLevelValue] = useState(null);
  const [levelOptions, setLevelOptions] = useState(LEVEL_OPTIONS);

  const handlePressGenerate = () => {
    navigation.navigate(routes.Review, { level: levelValue });
  };

  return (
    <View style={tw`h-full bg-gray-700 py-7 flex justify-between items-center`}>
      <Text style={tw`text-white mb-3`} variant="headlineSmall">
        Let's get started!
      </Text>
      <View style={tw`flex-grow p-5`}>
        <DropDownPicker
          aria-label="Choose your Level"
          open={levelOpen}
          value={levelValue}
          items={levelOptions}
          setOpen={setLevelOpen}
          setValue={setLevelValue}
          setItems={setLevelOptions}
        />
      </View>
      <Button mode="contained" onPress={handlePressGenerate}>
        Generate
      </Button>
    </View>
  );
};
