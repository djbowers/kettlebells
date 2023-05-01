import { BASE_ID, PERSONAL_ACCESS_TOKEN } from '@env';
import Airtable from 'airtable';
import { useEffect, useState } from 'react';

const MAX_RECORDS = 150;

export const useAirtableData = () => {
  Airtable.configure({ apiKey: PERSONAL_ACCESS_TOKEN });
  const base = Airtable.base(BASE_ID);

  const exercisesTable = base('Exercises');
  const variationsTable = base('Variations');
  const movementPatternsTable = base('Movement Patterns');
  const gripsTable = base('Grips');

  const [exercises, setExercises] = useState([]);
  const [variations, setVariations] = useState([]);
  const [movementPatterns, setMovementPatterns] = useState([]);
  const [grips, setGrips] = useState([]);

  const fetchExercises = () => {
    const exercises = [];
    exercisesTable.select({ maxRecords: MAX_RECORDS }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const exercise = {
            id: record.id,
            name: record.get('Name'),
            variations: record.get('Variations'),
          };
          exercises.push(exercise);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setExercises(exercises);
      }
    );
  };

  const fetchVariations = () => {
    const variations = [];
    variationsTable.select({ maxRecords: MAX_RECORDS }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const variation = {
            id: record.id,
            name: record.get('Name'),
            aka: record.get('Aka'),
            exercise: record.get('Exercise'),
            movementPatterns: record.get('Movement Patterns'),
            grips: record.get('Grips'),
          };
          variations.push(variation);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setVariations(variations);
      }
    );
  };

  const fetchMovementPatterns = () => {
    const movementPatterns = [];
    movementPatternsTable.select({ maxRecords: MAX_RECORDS }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const movementPattern = {
            id: record.id,
            name: record.get('Name'),
            variations: record.get('Variations'),
          };
          movementPatterns.push(movementPattern);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setMovementPatterns(movementPatterns);
      }
    );
  };

  const fetchGrips = () => {
    const grips = [];
    gripsTable.select({ maxRecords: MAX_RECORDS }).eachPage(
      (records, fetchNextPage) => {
        records.forEach(function (record) {
          const configuration = {
            id: record.id,
            name: record.get('Name'),
            arms: record.get('Arms'),
            kettlebells: record.get('Kettlebells'),
            variations: record.get('Variations'),
          };
          grips.push(configuration);
        });
        fetchNextPage();
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
        setGrips(grips);
      }
    );
  };

  useEffect(() => {
    if (exercises.length === 0) fetchExercises();
    if (variations.length === 0) fetchVariations();
    if (movementPatterns.length === 0) fetchMovementPatterns();
    if (grips.length === 0) fetchGrips();
  }, []);

  return { exercises, variations, movementPatterns, grips };
};
