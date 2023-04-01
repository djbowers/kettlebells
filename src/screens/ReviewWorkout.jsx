import { BASE_ID } from '@env';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import tw from 'twrnc';

export const ReviewWorkout = ({ navigation }) => {
  const base = Airtable.base(BASE_ID);
  const table = base('Table 1');

  const [exercises, setExercises] = useState([]);

  const fetchExercises = () => {
    table.select({ maxRecords: 3 }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const name = record.get('Name');
          setExercises((prev) => [...prev, name]);
        });
        fetchNextPage();
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <View style={tw`h-full bg-gray-700 py-4 flex justify-between items-center`}>
      <Text style={tw`text-white`} variant="titleLarge">
        Workout
      </Text>
      <View style={tw`w-full flex-grow`}>
        <Text style={tw`text-white`} variant="titleMedium">
          {exercises.length} Exercises
        </Text>
        <Divider />
        <View>
          {exercises.map((exercise, i) => (
            <Text style={tw`text-white`} key={i} variant="bodyMedium">
              {exercise}
            </Text>
          ))}
        </View>
      </View>
      <Button mode="contained">Start Workout</Button>
    </View>
  );
};
