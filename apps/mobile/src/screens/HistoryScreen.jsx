import { Flex, Text } from 'native-base';

export const HistoryScreen = () => {
  return (
    <Flex
      safeAreaTop
      h="full"
      w="full"
      bgColor="layout.background"
      justify="center"
      alignItems="center"
    >
      <Text fontSize="md" fontWeight="medium">
        History coming soon!
      </Text>
    </Flex>
  );
};
