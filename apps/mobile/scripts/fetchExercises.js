const fetchRecords = require('./fetchRecords');
const { base } = require('./initAirtable');

const exercisesTable = base('Exercises');

const fetchExercises = () => {
  const exercises = [];

  const callbackfn = (record) => {
    exercises.push({
      id: record.id,
      name: record.get('Name'),
      variations: record.get('Variations'),
      type: record.get('Type'),
    });
  };

  fetchRecords(
    exercisesTable,
    exercises,
    callbackfn,
    'src/data/exercises.json',
  );
};

module.exports = fetchExercises;
