import { Button, StyleSheet, Text, View } from 'react-native';

import { HorizontalRule } from '../components';
import { globalStyles } from '../styles';
import { size, weight } from '../theme';

export const ReviewWorkoutScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.subheading}>8 Exercises</Text>
        <HorizontalRule />
      </View>
      <Button title="Start Workout" color="darkorange" />
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
  innerContainer: {
    width: '100%',
    flexGrow: 1,
  },
  title: {
    ...globalStyles.text,
    fontSize: size.font20,
    fontWeight: weight.bold,
    fontStyle: 'italic',
  },
  subheading: {
    ...globalStyles.text,
    fontSize: size.font16,
    fontWeight: weight.semi,
    fontStyle: 'italic',
  },
});
