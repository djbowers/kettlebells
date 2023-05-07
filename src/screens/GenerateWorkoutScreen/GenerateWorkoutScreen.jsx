import Slider from '@react-native-community/slider';
import { Box, Button, Flex, Text } from 'native-base';
import { useState } from 'react';

import { SelectOption } from '~/components';
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

        {/* todo: create a custom Slider that stores its value in async storage */}
        <Slider
          onValueChange={changeDuration}
          maximumValue={MAX_DURATION}
          minimumValue={MIN_DURATION}
          step={DURATION_STEP}
          value={duration}
          accessibilityLabel="Select Duration"
        />

        <Flex
          flexDirection="row"
          flexWrap={true}
          justifyContent="space-between"
        >
          <SelectOption
            onChangeOption={changeLevel}
            options={LEVEL_OPTIONS}
            placeholder="Level"
            selectedOption={level}
            storageKey="level"
          />
          <SelectOption
            onChangeOption={changeGrip}
            options={GRIP_OPTIONS}
            placeholder="Grip"
            selectedOption={grip}
            storageKey="grip"
          />
          <SelectOption
            onChangeOption={changePrimaryFocus}
            options={FOCUS_OPTIONS}
            placeholder="Primary Focus"
            selectedOption={primaryFocus}
            storageKey="primaryFocus"
          />
          {!hideSecondaryFocus && (
            <SelectOption
              onChangeOption={changeSecondaryFocus}
              options={secondaryFocusOptions}
              placeholder="Secondary Focus"
              selectedOption={secondaryFocus}
              storageKey="secondaryFocus"
            />
          )}
          <SelectOption
            onChangeOption={changeSets}
            options={SETS_OPTIONS}
            placeholder="Sets per Exercise"
            selectedOption={sets}
            storageKey="sets"
          />
          <SelectOption
            onChangeOption={changeSetLength}
            options={SET_LENGTH_OPTIONS}
            placeholder="Set Length"
            selectedOption={setLength}
            storageKey="setLength"
          />
        </Flex>
      </Box>
      <Button mt={3} onPress={handlePressGenerate} isDisabled={disableGenerate}>
        Generate
      </Button>
    </Flex>
  );
};
