import Slider from '@react-native-community/slider';
import { Box, Button, Flex, Text } from 'native-base';
import { useState } from 'react';

import { SelectOption } from '../components';
import {
  FOCUS_OPTIONS,
  LEVEL_OPTIONS,
  SETS_OPTIONS,
  SET_LENGTH_OPTIONS,
  WORKOUT_ROUTES,
} from '../constants';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [duration, setDuration] = useState(30);
  const [level, setLevel] = useState(null);
  const [focus, setFocus] = useState(null);
  const [sets, setSets] = useState(null);
  const [setLength, setSetLength] = useState(null);

  const handlePressGenerate = () => {
    navigation.navigate(WORKOUT_ROUTES.review, {
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
    <Box py={3} px={5}>
      <Text textAlign="center" fontSize="xl">
        Let's get started!
      </Text>
      <Box>
        <Text fontSize="sm" textAlign="center" mt={3}>
          {duration} minutes
        </Text>
        <Slider
          minimumValue={15}
          maximumValue={90}
          onValueChange={setDuration}
          step={5}
          value={duration}
        />

        <Flex
          flexDirection="row"
          flexWrap={true}
          justifyContent="space-between"
        >
          <SelectOption
            selectedValue={level}
            placeholder="Level"
            onValueChange={setLevel}
            options={LEVEL_OPTIONS}
          />

          <SelectOption
            selectedValue={focus}
            placeholder="Focus"
            onValueChange={setFocus}
            options={FOCUS_OPTIONS}
          />

          <SelectOption
            selectedValue={sets}
            placeholder="Sets per Exercise"
            onValueChange={setSets}
            options={SETS_OPTIONS}
          />

          <SelectOption
            selectedValue={setLength}
            placeholder="Set Length"
            onValueChange={setSetLength}
            options={SET_LENGTH_OPTIONS}
          />
        </Flex>
      </Box>
      <Button mt={3} onPress={handlePressGenerate} isDisabled={disabled}>
        Generate
      </Button>
    </Box>
  );
};
