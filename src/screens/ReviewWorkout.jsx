import { BASE_ID } from '@env';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import tw from 'twrnc';

import { HorizontalRule } from '../components';

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
      <Text style={tw`text-white`}>Workout</Text>
      <View style={tw`w-full flex-grow`}>
        <Text style={tw`text-white`}>{exercises.length} Exercises</Text>
        <HorizontalRule />
        <View>
          {exercises.map((exercise, i) => (
            <Text style={tw`text-white`} key={i}>
              {exercise}
            </Text>
          ))}
        </View>
      </View>
      <Button title="Start Workout" color="darkorange" />
    </View>
  );
};
