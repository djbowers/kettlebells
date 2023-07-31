import { Flex, Spacer, Text } from 'native-base';
import { Button } from '~/components';
import { WORKOUT_ROUTES } from '~/constants';

export const FinishedWorkoutScreen = ({ navigation, route }) => {
  const { duration } = route.params;

  const handlePressHome = () => {
    navigation.navigate(WORKOUT_ROUTES.generate);
  };

  return (
    <Flex
      bgColor="layout.background"
      h="full"
      w="full"
      alignItems="center"
      py={1}
      safeAreaTop
    >
      <Text>Congratulations!</Text>
      <Text>Completed workout in: {duration} seconds</Text>

      <Spacer />
      <Button onPress={handlePressHome}>Go Home</Button>
    </Flex>
  );
};
