import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Beginner', value: 'Beginner' },
    { label: 'Intermediate', value: 'Intermediate' },
    { label: 'Advanced', value: 'Advanced' },
  ]);

  const handlePressGenerate = () => {
    navigation.navigate(routes.Review);
  };

  return (
    <View style={tw`h-full bg-gray-700 py-7 flex justify-between items-center`}>
      <Text style={tw`text-white mb-3`} variant="headlineSmall">
        Let's get started!
      </Text>
      <View style={tw`flex-grow p-5`}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>
      <Button mode="contained" onPress={handlePressGenerate}>
        Generate
      </Button>
    </View>
  );
};
