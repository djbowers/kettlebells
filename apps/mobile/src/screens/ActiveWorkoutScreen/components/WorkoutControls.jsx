import { Button, Flex, Progress, Spacer, Text } from 'native-base';

import { WARMUP_DURATION } from '~/constants';
import { useTimer } from '~/hooks';

export const WorkoutControls = ({
  currentRound,
  isWarmup,
  onFinishWorkout,
  setCurrentRound,
  sets,
  setLength,
  totalRounds,
}) => {
  const [elapsedInSet, { resetTimer, seconds: elapsedSecondsInSet }] =
    useTimer();

  const handlePressPrev = () => {
    if (currentRound > 0) {
      resetTimer();
      setCurrentRound((prev) => prev - 1);
    }
  };

  const handlePressNext = () => {
    if (currentRound < totalRounds) {
      resetTimer();
      setCurrentRound((prev) => prev + 1);
    } else {
      onFinishWorkout();
    }
  };

  const currentSetNumber = currentRound % sets || sets;
  const roundLength = isWarmup ? WARMUP_DURATION : setLength;

  return (
    <Flex w="full" my={2} aria-label="Workout Controls">
      {!isWarmup && (
        <Text mb={2} textAlign="center">
          Set {currentSetNumber} / {sets}
        </Text>
      )}

      <Progress
        value={elapsedSecondsInSet}
        max={roundLength * 60}
        size="2xl"
        colorScheme="secondary"
      />

      <Flex direction="row" alignItems="center" my={2} position="relative">
        <Spacer />
        <Text fontSize="4xl">{elapsedInSet}</Text>
        <Spacer />
        <Text fontSize="md" position="absolute" right={0}>
          {roundLength}m
        </Text>
      </Flex>

      <Flex direction="row" my={2}>
        <Spacer />
        <Button
          onPress={handlePressPrev}
          size="xs"
          variant="ghost"
          colorScheme="muted"
        >
          <Text fontWeight="medium" fontSize="md" color="muted.500">
            PREV
          </Text>
        </Button>
        <Spacer />
        <Button
          size="xs"
          variant="solid"
          colorScheme="primary"
          onPress={handlePressNext}
        >
          <Text fontWeight="medium" fontSize="md" color="white">
            NEXT
          </Text>
        </Button>
        <Spacer />
      </Flex>
    </Flex>
  );
};
