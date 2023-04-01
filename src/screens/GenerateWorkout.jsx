import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { LEVEL_OPTIONS, routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const [duration, setDuration] = useState(30);

  const [level, setLevel] = useState(null);
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelOptions, setLevelOptions] = useState(LEVEL_OPTIONS);

  const handlePressGenerate = () => {
    navigation.navigate(routes.Review, { level, duration });
  };

  const disabled = level === null;

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text style={tw`mb-3`} variant="headlineSmall">
        Let's get started!
      </Text>
      <View style={tw`flex-grow p-5`}>
        <Slider
          value={duration}
          onValueChange={setDuration}
          minimumValue={15}
          maximumValue={90}
          step={5}
          renderAboveThumbComponent={() => <Text>{duration}</Text>}
        />
        <DropDownPicker
          aria-label="Choose your Level"
          open={levelOpen}
          value={level}
          items={levelOptions}
          setOpen={setLevelOpen}
          setValue={setLevel}
          setItems={setLevelOptions}
        />
      </View>
      <Button
        mode="contained"
        onPress={handlePressGenerate}
        disabled={disabled}
      >
        Generate
      </Button>
    </View>
  );
};
