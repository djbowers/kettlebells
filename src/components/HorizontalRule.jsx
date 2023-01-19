import { StyleSheet, View } from 'react-native';

export const HorizontalRule = () => {
  return (
    <View
      style={{
        width: '100%',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
};
