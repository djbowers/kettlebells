import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import { LEVEL_OPTIONS, SETS_OPTIONS, routes } from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const [duration, setDuration] = useState(30);

  const [levelValue, setLevelValue] = useState(null);
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelOptions, setLevelOptions] = useState(LEVEL_OPTIONS);

  const [setsValue, setSetsValue] = useState(null);
  const [setsOpen, setSetsOpen] = useState(false);
  const [setsOptions, setSetsOptions] = useState(SETS_OPTIONS);

  const handleLevelOpen = () => {
    setSetsOpen(false);
  };

  const handleSetsOpen = () => {
    setLevelOpen(false);
  };

  const handlePressGenerate = () => {
    navigation.navigate(routes.Review, {
      duration,
      level: levelValue,
      sets: setsValue,
    });
  };

  const disabled = levelValue === null || setsValue === null;

  return (
    <View style={tw`h-full py-7 flex justify-between items-center`}>
      <Text style={tw`mb-3`} variant="headlineSmall">
        Let's get started!
      </Text>
      <View style={tw`flex-grow p-5`}>
        <Text style={tw`text-center`} variant="labelLarge">
          {duration} minutes
        </Text>
        <Slider
          value={duration}
          onValueChange={setDuration}
          minimumValue={15}
          maximumValue={90}
          step={5}
        />

        {/* Level */}
        <DropDownPicker
          style={tw`mt-3`}
          open={levelOpen}
          value={levelValue}
          items={levelOptions}
          setOpen={setLevelOpen}
          setValue={setLevelValue}
          setItems={setLevelOptions}
          placeholder="Level"
          zIndex={2000}
          zIndexInverse={2000}
          onOpen={handleLevelOpen}
        />

        {/* Sets */}
        <DropDownPicker
          placeholder="Sets per exercise"
          style={tw`mt-3`}
          open={setsOpen}
          value={setsValue}
          items={setsOptions}
          setOpen={setSetsOpen}
          setValue={setSetsValue}
          setItems={setSetsOptions}
          zIndex={1000}
          zIndexInverse={3000}
          onOpen={handleSetsOpen}
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
