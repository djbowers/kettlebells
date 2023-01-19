import { StyleSheet } from 'react-native';

import { colors } from '../theme';

export const globalStyles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: colors.backgroundColor,
    paddingVertical: 32,
  },
  text: {
    color: 'white',
  },
});
