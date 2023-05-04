import { Select } from 'native-base';

import { useAsyncStorage } from '~/hooks';

export const SelectOption = ({
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
    <Select
      dropdownIcon={() => null}
      flexBasis="48%"
      onValueChange={handleChangeOption}
      placeholder={placeholder}
      py={5}
      mt={3}
      selectedValue={selectedOption}
      variant="filled"
    >
      {options.map(({ label, value }) => (
        <Select.Item key={label} label={label} value={value} />
      ))}
    </Select>
  );
};
