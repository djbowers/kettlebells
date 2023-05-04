import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import { Box, Button, Flex, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { SelectOption } from '~/components';
import {
  FOCUS_OPTIONS,
  GRIP_OPTIONS,
  LEVEL_OPTIONS,
  SET_COUNT_OPTIONS,
  SET_LENGTH_OPTIONS,
  WORKOUT_ROUTES,
} from '~/constants';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [options, setOptions] = useState({
    duration: 30,
    level: undefined,
    primaryFocus: undefined,
    secondaryFocus: undefined,
    sets: undefined,
    setLength: undefined,
    grip: undefined,
  });

  const {
    duration,
    level,
    primaryFocus,
    secondaryFocus,
    sets,
    setLength,
    grip,
  } = options;

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
    const loadStoredOptions = async () => {
      const storedOptions = await readOptionsFromStorage();
      if (storedOptions) setOptions({ ...options, ...storedOptions });
    };
    loadStoredOptions();
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

  const handleChangePrimaryFocus = (focus) => {
    handleChangeOptions({ ...options, primaryFocus: focus });
  };

  const handleChangeSecondaryFocus = (focus) => {
    handleChangeOptions({ ...options, secondaryFocus: focus });
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
    primaryFocus === null ||
    sets === null ||
    setLength === null ||
    grip === null;

  const secondaryFocusOptions = FOCUS_OPTIONS.filter(
    (focus) => focus.value !== primaryFocus
  );

  return (
    <Flex
      bgColor="layout.background"
      height="full"
      justifyContent="space-between"
      px={5}
      py={3}
      safeAreaTop
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
            onValueChange={handleChangeGrip}
            options={GRIP_OPTIONS}
            placeholder="Grip"
            selectedValue={grip}
          />
          <SelectOption
            onValueChange={handleChangePrimaryFocus}
            options={FOCUS_OPTIONS}
            placeholder="Primary Focus"
            selectedValue={primaryFocus}
          />
          {primaryFocus !== 'None' && (
            <SelectOption
              onValueChange={handleChangeSecondaryFocus}
              options={secondaryFocusOptions}
              placeholder="Secondary Focus"
              selectedValue={secondaryFocus}
            />
          )}
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
        </Flex>
      </Box>
      <Button mt={3} onPress={handlePressGenerate} isDisabled={disabled}>
        Generate
      </Button>
    </Flex>
  );
};
