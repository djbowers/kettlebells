import { Slider } from '@miblanchard/react-native-slider';
import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button, Text } from 'react-native-paper';
import tw from 'twrnc';

import {
  FOCUS_OPTIONS,
  LEVEL_OPTIONS,
  ROUTES,
  SETS_OPTIONS,
} from '../constants';

export const GenerateWorkout = ({ navigation }) => {
  const [duration, setDuration] = useState(30);

  const [levelValue, setLevelValue] = useState(null);
  const [levelOpen, setLevelOpen] = useState(false);
  const [levelOptions, setLevelOptions] = useState(LEVEL_OPTIONS);

  const [focusValue, setFocusValue] = useState(null);
  const [focusOpen, setFocusOpen] = useState(false);
  const [focusOptions, setFocusOptions] = useState(FOCUS_OPTIONS);

  const [setsValue, setSetsValue] = useState(null);
  const [setsOpen, setSetsOpen] = useState(false);
  const [setsOptions, setSetsOptions] = useState(SETS_OPTIONS);

  const handleLevelOpen = () => {
    setFocusOpen(false);
    setSetsOpen(false);
  };

  const handleFocusOpen = () => {
    setLevelOpen(false);
    setSetsOpen(false);
  };

  const handleSetsOpen = () => {
    setLevelOpen(false);
    setFocusOpen(false);
  };

  const handlePressGenerate = () => {
    navigation.navigate(ROUTES.Review, {
      duration,
      focus: focusValue,
      level: levelValue,
      sets: setsValue,
    });
  };

  const disabled =
    levelValue === null || focusValue === null || setsValue === null;

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
          placeholder="Level"
          style={tw`mt-3`}
          open={levelOpen}
          value={levelValue}
          items={levelOptions}
          setOpen={setLevelOpen}
          setValue={setLevelValue}
          setItems={setLevelOptions}
          zIndex={3000}
          zIndexInverse={1000}
          onOpen={handleLevelOpen}
        />

        {/* Focus */}
        <DropDownPicker
          placeholder="Focus"
          style={tw`mt-3`}
          open={focusOpen}
          value={focusValue}
          items={focusOptions}
          setOpen={setFocusOpen}
          setValue={setFocusValue}
          setItems={setFocusOptions}
          zIndex={2000}
          zIndexInverse={2000}
          onOpen={handleFocusOpen}
        />

        {/* Sets */}
        <DropDownPicker
          placeholder="Sets per Exercise"
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
