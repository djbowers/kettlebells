import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Box, Button, Flex, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { SelectOption } from '../components';
import {
  FOCUS_OPTIONS,
  LEVEL_OPTIONS,
  SETS_OPTIONS,
  SET_LENGTH_OPTIONS,
  WORKOUT_ROUTES,
} from '../constants';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [options, setOptions] = useState({
    duration: 30,
    level: null,
    focus: null,
    sets: null,
    setLength: null,
  });
  const { duration, level, focus, sets, setLength } = options;

  const { getItem, setItem } = useAsyncStorage('@options');

  const readOptionsFromStorage = async () => {
    const item = await getItem();
    const options = JSON.parse(item);
    if (options) setOptions(options);
  };

  const writeOptionsToStorage = async (options) => {
    const item = JSON.stringify(options);
    await setItem(item);
    setOptions(options);
  };

  useEffect(() => {
    readOptionsFromStorage();
  }, []);

  const handleChangeDuration = (duration) =>
    writeOptionsToStorage({ ...options, duration });

  const handleChangeLevel = (level) =>
    writeOptionsToStorage({ ...options, level });

  const handleChangeFocus = (focus) =>
    writeOptionsToStorage({ ...options, focus });

  const handleChangeSets = (sets) =>
    writeOptionsToStorage({ ...options, sets });

  const handleChangeSetLength = (setLength) =>
    writeOptionsToStorage({ ...options, setLength });

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
          onValueChange={handleChangeDuration}
          maximumValue={90}
          minimumValue={15}
          step={5}
          value={duration}
        />

        <Flex
          flexDirection="row"
          flexWrap={true}
          justifyContent="space-between"
        >
          <SelectOption
            onValueChange={handleChangeLevel}
            options={LEVEL_OPTIONS}
            placeholder="Level"
            selectedValue={level}
          />
          <SelectOption
            onValueChange={handleChangeFocus}
            options={FOCUS_OPTIONS}
            placeholder="Focus"
            selectedValue={focus}
          />
          <SelectOption
            onValueChange={handleChangeSets}
            options={SETS_OPTIONS}
            placeholder="Sets per Exercise"
            selectedValue={sets}
          />
          <SelectOption
            onValueChange={handleChangeSetLength}
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
