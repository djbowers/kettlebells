import { Flex, Select, Spacer, Text } from 'native-base';

import { useAsyncStorage } from '~/hooks';

export const SelectOption = ({
  label,
  onChangeOption,
  options,
  placeholder,
  selectedOption,
  storageKey,
}) => {
  const [writeOptionToStorage] = useAsyncStorage(storageKey, onChangeOption);

  const handleChangeOption = (option) => {
    onChangeOption(option);
    writeOptionToStorage(option);
  };

  return (
    <Flex direction="row" alignItems="center" mt={2}>
      <Text fontSize="sm" fontWeight="medium" flexGrow textAlign="right" pr={2}>
        {label}:
      </Text>

      <Select
        flexBasis="75%"
        dropdownIcon={() => null}
        onValueChange={handleChangeOption}
        placeholder={placeholder}
        selectedValue={selectedOption}
        variant="filled"
        bgColor="muted.100"
        fontWeight="medium"
        shadow="1"
        fontSize="sm"
      >
        {options.map(({ label, value }) => (
          <Select.Item key={label} label={label} value={value} p={1} py={1.5} />
        ))}
      </Select>
    </Flex>
  );
};
