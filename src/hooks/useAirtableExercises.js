import { BASE_ID, PERSONAL_ACCESS_TOKEN } from '@env';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';

export const useAirtableExercises = () => {
  const [exercises, setExercises] = useState([]);

  Airtable.configure({ apiKey: PERSONAL_ACCESS_TOKEN });
  const base = Airtable.base(BASE_ID);
  const table = base('Kettlebell Exercises');

  const fetchExercises = () => {
    table.select({ maxRecords: 150 }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const exercise = {
            id: record.id,
            name: record.get('Name'),
            focus: record.get('Focus'),
            level: record.get('Level'),
          };
          setExercises((prev) => [...prev, exercise]);
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
    if (exercises.length === 0) fetchExercises();
  }, []);

  return exercises;
};
