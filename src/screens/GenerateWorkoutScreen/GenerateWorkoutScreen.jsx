import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Box, Button, Flex, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { SelectOption } from '~/components';
import {
  FOCUSES,
  FOCUS_OPTIONS,
  GRIPS,
  GRIP_OPTIONS,
  LEVELS,
  LEVEL_OPTIONS,
  SET_COUNT_OPTIONS,
  SET_LENGTH_OPTIONS,
  WORKOUT_ROUTES,
} from '~/constants';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [options, setOptions] = useState({
    duration: 30,
    level: LEVELS[0],
    focus: FOCUSES[0],
    sets: 3,
    setLength: 3,
    grip: GRIPS[0],
  });
  const { duration, level, focus, sets, setLength, grip } = options;

  const { getItem, setItem } = useAsyncStorage('@options');

  const readOptionsFromStorage = async () => {
    const item = await getItem();
    return JSON.parse(item);
  };

  const writeOptionsToStorage = async (options) => {
    const item = JSON.stringify(options);
    await setItem(item);
  };

  useEffect(() => {
    readOptionsFromStorage().then((storedOptions) => {
      if (storedOptions) setOptions({ ...options, ...storedOptions });
    });
  }, []);

  const handleChangeOptions = (options) => {
    setOptions(options);
    writeOptionsToStorage(options);
  };

  const handleChangeDuration = (duration) => {
    handleChangeOptions({ ...options, duration });
  };

  const handleChangeLevel = (level) => {
    handleChangeOptions({ ...options, level });
  };

  const handleChangeFocus = (focus) => {
    handleChangeOptions({ ...options, focus });
  };

  const handleChangeSets = (sets) => {
    handleChangeOptions({ ...options, sets });
  };

  const handleChangeSetLength = (setLength) => {
    handleChangeOptions({ ...options, setLength });
  };

  const handleChangeGrip = (grip) => {
    handleChangeOptions({ ...options, grip });
  };

  const handlePressGenerate = () => {
    navigation.navigate(WORKOUT_ROUTES.review, { options });
  };

  const disabled =
    level === null ||
    focus === null ||
    sets === null ||
    setLength === null ||
    grip === null;

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
            disabled={true}
          />
          <SelectOption
            onValueChange={handleChangeFocus}
            options={FOCUS_OPTIONS}
            placeholder="Focus"
            selectedValue={focus}
          />
          <SelectOption
            onValueChange={handleChangeSets}
            options={SET_COUNT_OPTIONS}
            placeholder="Sets per Exercise"
            selectedValue={sets}
          />
          <SelectOption
            onValueChange={handleChangeSetLength}
            options={SET_LENGTH_OPTIONS}
            placeholder="Set Length"
            selectedValue={setLength}
          />
          <SelectOption
            onValueChange={handleChangeGrip}
            options={GRIP_OPTIONS}
            placeholder="Grip"
            selectedValue={grip}
          />
        </Flex>
      </Box>
      <Button mt={3} onPress={handlePressGenerate} isDisabled={disabled}>
        Generate
      </Button>
    </Flex>
  );
};
