import Slider from '@react-native-community/slider';
import { Flex, SectionList, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { Button } from '~/components';
import {
  ARMS_OPTIONS,
  DEFAULT_DURATION,
  DURATION_STEP,
  FOCUS_OPTIONS,
  KETTLEBELLS_OPTIONS,
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
  const [arms, changeArms] = useState();
  const [kettlebells, changeKettlebells] = useState();

  const handlePressGenerate = () => {
    navigation.navigate(WORKOUT_ROUTES.review, {
      options: {
        duration,
        level,
        arms,
        kettlebells,
        sets,
        setLength,
        primaryFocus,
        secondaryFocus,
      },
    });
  };

  const disableGenerate =
    level === undefined || sets === undefined || setLength === undefined;

  const hideSecondaryFocus = primaryFocus === 'Any' || !primaryFocus;

  const secondaryFocusOptions = FOCUS_OPTIONS.filter(
    (focus) => focus.value !== primaryFocus
  );

  useEffect(() => {
    if (primaryFocus === 'Any') changeSecondaryFocus('Any');
  }, [primaryFocus]);

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

      <SectionList
        sections={[
          {
            title: 'Practice',
            data: [
              <SelectOption
                label="Level"
                onChangeOption={changeLevel}
                options={LEVEL_OPTIONS}
                placeholder="Choose a level"
                selectedOption={level}
                storageKey="level"
              />,
              <SelectOption
                label="Arms"
                onChangeOption={changeArms}
                options={ARMS_OPTIONS}
                placeholder="Choose arms"
                selectedOption={arms}
                storageKey="arms"
              />,
              <SelectOption
                label="Kettlebells"
                onChangeOption={changeKettlebells}
                options={KETTLEBELLS_OPTIONS}
                placeholder="Choose kettlebells"
                selectedOption={kettlebells}
                storageKey="kettlebells"
              />,
            ],
          },
          {
            title: 'Timing',
            data: [
              <SelectOption
                label="Sets"
                onChangeOption={changeSets}
                options={SETS_OPTIONS}
                placeholder="Choose sets per exercise"
                selectedOption={sets}
                storageKey="sets"
              />,
              <SelectOption
                label="Length"
                onChangeOption={changeSetLength}
                options={SET_LENGTH_OPTIONS}
                placeholder="Choose set length"
                selectedOption={setLength}
                storageKey="setLength"
              />,
            ],
          },
          {
            title: 'Focus',
            data: [
              <SelectOption
                label="Primary"
                onChangeOption={changePrimaryFocus}
                options={FOCUS_OPTIONS}
                placeholder="Choose primary focus"
                selectedOption={primaryFocus}
                storageKey="primaryFocus"
              />,
              !hideSecondaryFocus && (
                <SelectOption
                  label="Secondary"
                  onChangeOption={changeSecondaryFocus}
                  options={secondaryFocusOptions}
                  placeholder="Choose secondary focus"
                  selectedOption={secondaryFocus}
                  storageKey="secondaryFocus"
                />
              ),
            ],
          },
        ]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => item}
        renderSectionHeader={({ section: { title } }) => (
          <Text fontSize="lg" fontWeight="semibold" mt={2}>
            {title}
          </Text>
        )}
      />

      <Flex alignItems="center" mt={3}>
        <Button onPress={handlePressGenerate} isDisabled={disableGenerate}>
          Generate
        </Button>
      </Flex>
    </Flex>
  );
};
