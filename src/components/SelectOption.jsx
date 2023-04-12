import { Select } from 'native-base';

export const SelectOption = ({
  onValueChange,
  options,
  placeholder,
  selectedValue,
}) => {
  return (
    <Select
      dropdownIcon={() => null}
      flexBasis="48%"
      onValueChange={onValueChange}
      placeholder={placeholder}
      py={5}
      mt={3}
      selectedValue={selectedValue}
      variant="filled"
    >
      {options.map(({ label, value }) => (
        <Select.Item key={label} label={label} value={value} />
      ))}
    </Select>
  );
};
