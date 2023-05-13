import Slider from '@react-native-community/slider';
import { Box, Flex, Text } from 'native-base';
import { useState } from 'react';

import { Button } from '~/components';
import {
  DEFAULT_DURATION,
  DURATION_STEP,
  FOCUS_OPTIONS,
  GRIP_OPTIONS,
  LEVEL_OPTIONS,
  MAX_DURATION,
  MIN_DURATION,
  SETS_OPTIONS,
  SET_LENGTH_OPTIONS,
  WORKOUT_ROUTES,
} from '~/constants';

import { SelectOption } from './components';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const [duration, changeDuration] = useState(DEFAULT_DURATION);
  const [level, changeLevel] = useState();
  const [primaryFocus, changePrimaryFocus] = useState();
  const [secondaryFocus, changeSecondaryFocus] = useState();
  const [sets, changeSets] = useState();
  const [setLength, changeSetLength] = useState();
  const [grip, changeGrip] = useState();

  const handlePressGenerate = () => {
    navigation.navigate(WORKOUT_ROUTES.review, {
      options: {
        duration,
        level,
        primaryFocus,
        secondaryFocus,
        sets,
        setLength,
        grip,
      },
    });
  };

  const disableGenerate =
    level === undefined || sets === undefined || setLength === undefined;

  const hideSecondaryFocus = primaryFocus === 'Any' || !primaryFocus;

  const secondaryFocusOptions = FOCUS_OPTIONS.filter(
    (focus) => focus.value !== primaryFocus
  );

  return (
    <Flex
      bgColor="layout.background"
      h="full"
      w="full"
      px={2}
      py={1}
      safeAreaTop
    >
      <Text textAlign="center" fontSize="xl" my={2}>
        Let's get started!
      </Text>
      <Box flexGrow>
        <Text fontSize="sm" textAlign="center" mt={1}>
          {duration} minutes
        </Text>

        {/* todo: create a custom Slider that stores its value in async storage */}
        <Slider
          onValueChange={changeDuration}
          maximumValue={MAX_DURATION}
          minimumValue={MIN_DURATION}
          step={DURATION_STEP}
          value={duration}
          accessibilityLabel="Select Duration"
        />

        <Flex alignItems="center">
          <Text fontSize="lg" fontWeight="semibold" mt={2}>
            Practice
          </Text>
          <SelectOption
            label="Level"
            onChangeOption={changeLevel}
            options={LEVEL_OPTIONS}
            placeholder="Level"
            selectedOption={level}
            storageKey="level"
          />
          <SelectOption
            label="Grip"
            onChangeOption={changeGrip}
            options={GRIP_OPTIONS}
            placeholder="Grip"
            selectedOption={grip}
            storageKey="grip"
          />
          <SelectOption
            label="Sets"
            onChangeOption={changeSets}
            options={SETS_OPTIONS}
            placeholder="Sets per Exercise"
            selectedOption={sets}
            storageKey="sets"
          />
          <SelectOption
            label="Length"
            onChangeOption={changeSetLength}
            options={SET_LENGTH_OPTIONS}
            placeholder="Set Length"
            selectedOption={setLength}
            storageKey="setLength"
          />

          <Text fontSize="lg" fontWeight="semibold" mt={2}>
            Focus
          </Text>
          <SelectOption
            label="Primary"
            onChangeOption={changePrimaryFocus}
            options={FOCUS_OPTIONS}
            placeholder="Primary Focus"
            selectedOption={primaryFocus}
            storageKey="primaryFocus"
          />
          {!hideSecondaryFocus && (
            <SelectOption
              label="Secondary"
              onChangeOption={changeSecondaryFocus}
              options={secondaryFocusOptions}
              placeholder="Secondary Focus"
              selectedOption={secondaryFocus}
              storageKey="secondaryFocus"
            />
          )}
        </Flex>
      </Box>

      <Flex alignItems="center">
        <Button onPress={handlePressGenerate} isDisabled={disableGenerate}>
          Generate
        </Button>
      </Flex>
    </Flex>
  );
};
