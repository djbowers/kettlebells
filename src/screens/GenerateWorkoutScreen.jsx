import Slider from '@react-native-community/slider';
import { Button, Select, Text } from 'native-base';
import { useState } from 'react';
import { View } from 'react-native';

import {
  FOCUS_OPTIONS,
  LEVEL_OPTIONS,
  ROUTES,
  SETS_OPTIONS,
  SET_LENGTH_OPTIONS,
} from '../constants';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [duration, setDuration] = useState(30);
  const [level, setLevel] = useState(null);
  const [focus, setFocus] = useState(null);
  const [sets, setSets] = useState(null);
  const [setLength, setSetLength] = useState(null);

  const handlePressGenerate = () => {
    navigation.navigate(ROUTES.review, {
      duration,
      focus,
      level,
      sets,
      setLength,
    });
  };

  const disabled =
    level === null || focus === null || sets === null || setLength === null;

  return (
    <View>
      <Text fontSize="xl">Let's get started!</Text>
      <View>
        <Text fontSize="sm">{duration} minutes</Text>
        <Slider
          minimumValue={15}
          maximumValue={90}
          onValueChange={setDuration}
          step={5}
          value={duration}
        />

        <Select
          selectedValue={level}
          placeholder="Level"
          mt={1}
          onValueChange={setLevel}
        >
          {LEVEL_OPTIONS.map(({ label, value }) => {
            return <Select.Item key={label} label={label} value={value} />;
          })}
        </Select>

        <Select
          selectedValue={focus}
          placeholder="Focus"
          mt={1}
          onValueChange={setFocus}
        >
          {FOCUS_OPTIONS.map(({ label, value }) => {
            return <Select.Item key={label} label={label} value={value} />;
          })}
        </Select>

        <Select
          selectedValue={sets}
          placeholder="Sets per Exercise"
          mt={1}
          onValueChange={setSets}
        >
          {SETS_OPTIONS.map(({ label, value }) => {
            return <Select.Item key={label} label={label} value={value} />;
          })}
        </Select>

        <Select
          selectedValue={setLength}
          placeholder="Set Length"
          mt={1}
          onValueChange={setSetLength}
        >
          {SET_LENGTH_OPTIONS.map(({ label, value }) => {
            return <Select.Item key={label} label={label} value={value} />;
          })}
        </Select>
      </View>
      <Button onPress={handlePressGenerate} isDisabled={disabled}>
        Generate
      </Button>
    </View>
  );
};
