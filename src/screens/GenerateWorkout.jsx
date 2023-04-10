import Slider from '@react-native-community/slider';
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
  SET_LENGTH_OPTIONS,
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

  const [setLengthValue, setSetLengthValue] = useState(null);
  const [setLengthOpen, setSetLengthOpen] = useState(false);
  const [setLengthOptions, setSetLengthOptions] = useState(SET_LENGTH_OPTIONS);

  const handleLevelOpen = () => {
    setFocusOpen(false);
    setSetsOpen(false);
    setSetLengthOpen(false);
  };

  const handleFocusOpen = () => {
    setLevelOpen(false);
    setSetsOpen(false);
    setSetLengthOpen(false);
  };

  const handleSetsOpen = () => {
    setLevelOpen(false);
    setFocusOpen(false);
    setSetLengthOpen(false);
  };

  const handleSetLengthOpen = () => {
    setFocusOpen(false);
    setLevelOpen(false);
    setSetsOpen(false);
  };

  const handlePressGenerate = () => {
    navigation.navigate(ROUTES.review, {
      duration,
      focus: focusValue,
      level: levelValue,
      sets: setsValue,
      setLength: setLengthValue,
    });
  };

  const disabled =
    levelValue === null ||
    focusValue === null ||
    setsValue === null ||
    setLengthValue === null;

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
          minimumValue={15}
          maximumValue={90}
          onValueChange={setDuration}
          step={5}
          value={duration}
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
          zIndex={4000}
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
          zIndex={3000}
          zIndexInverse={2000}
          onOpen={handleFocusOpen}
        />

        {/* Sets per Exercise */}
        <DropDownPicker
          placeholder="Sets per Exercise"
          style={tw`mt-3`}
          open={setsOpen}
          value={setsValue}
          items={setsOptions}
          setOpen={setSetsOpen}
          setValue={setSetsValue}
          setItems={setSetsOptions}
          zIndex={2000}
          zIndexInverse={3000}
          onOpen={handleSetsOpen}
        />

        {/* Set Length */}
        <DropDownPicker
          placeholder="Set Length"
          style={tw`mt-3`}
          open={setLengthOpen}
          value={setLengthValue}
          items={setLengthOptions}
          setOpen={setSetLengthOpen}
          setValue={setSetLengthValue}
          setItems={setSetLengthOptions}
          zIndex={1000}
          zIndexInverse={4000}
          onOpen={handleSetLengthOpen}
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
