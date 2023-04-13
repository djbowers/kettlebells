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
    <Flex
      bgColor="layout.background"
      height="full"
      justifyContent="space-between"
      px={5}
      py={3}
    >
      <Text textAlign="center" fontSize="xl">
        Let's get started!
      </Text>
      <Box flexGrow>
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
            onValueChange={setLevel}
            options={LEVEL_OPTIONS}
            placeholder="Level"
            selectedValue={level}
          />
          <SelectOption
            onValueChange={setFocus}
            options={FOCUS_OPTIONS}
            placeholder="Focus"
            selectedValue={focus}
          />
          <SelectOption
            onValueChange={setSets}
            options={SETS_OPTIONS}
            placeholder="Sets per Exercise"
            selectedValue={sets}
          />
          <SelectOption
            onValueChange={setSetLength}
            options={SET_LENGTH_OPTIONS}
            placeholder="Set Length"
            selectedValue={setLength}
          />
        </Flex>
      </Box>
      <Button mt={3} onPress={handlePressGenerate} isDisabled={disabled}>
        Generate
      </Button>
    </Flex>
  );
};
