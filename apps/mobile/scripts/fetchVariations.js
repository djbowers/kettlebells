const fetchRecords = require('./fetchRecords');
const { base } = require('./initAirtable');

const variationsTable = base('Variations');

const fetchVariations = () => {
  const variations = [];

  const callbackfn = (record) => {
    const [exerciseType] = record.get('Exercise Type');
    const [exerciseId] = record.get('Exercise');
    const [exerciseName] = record.get('Exercise Name');

    const variation = {
      id: record.id,
      name: record.get('Name'),
      aka: record.get('Aka'),
      exercise: exerciseId,
      exerciseName,
      movementPatterns: record.get('Movement Patterns'),
      grips: record.get('Grips'),
      level: record.get('Level'),
      type: record.get('Variation Type') || exerciseType,
    };

    if (record.get('Active')) variations.push(variation);
  };

  fetchRecords(
    variationsTable,
    variations,
    callbackfn,
    'src/data/variations.json',
  );
};

module.exports = fetchVariations;
