import { Button, StyleSheet, Text, View } from 'react-native';

import { routes } from '../constants';
import { globalStyles } from '../styles';
import { colors } from '../theme';

export const GenerateWorkoutScreen = ({ navigation }) => {
  const handlePressGenerate = () => {
    navigation.navigate(routes.Review);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Let's get started!</Text>
      <Button
        title="Generate"
        color="darkorange"
        onPress={handlePressGenerate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.screen,
    flex: true,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...globalStyles.text,
  },
});
