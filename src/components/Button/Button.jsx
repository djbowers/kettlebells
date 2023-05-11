import { Button as NativeButton, Text } from 'native-base';

export const Button = ({ children, ...props }) => {
  return (
    <NativeButton size="xs" {...props}>
      <Text fontWeight="medium" fontSize="md" color="white">
        {children}
      </Text>
    </NativeButton>
  );
};
