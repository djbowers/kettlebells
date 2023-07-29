const fetchRecords = require('./fetchRecords');
const { base } = require('./initAirtable');

const gripsTable = base('Grips');

const fetchGrips = () => {
  const grips = [];

  const callbackfn = (record) => {
    grips.push({
      id: record.id,
      name: record.get('Name'),
      arms: record.get('Arms'),
      kettlebells: record.get('Kettlebells'),
      variations: record.get('Variations'),
    });
  };

  fetchRecords(gripsTable, grips, callbackfn, 'src/data/grips.json');
};

module.exports = fetchGrips;
