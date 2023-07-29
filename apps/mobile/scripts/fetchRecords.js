var fs = require('fs');

const fetchRecords = (table, data, callbackfn, filename) => {
  table.select({ maxRecords: 150 }).eachPage(
    (records, fetchNextPage) => {
      records.forEach(callbackfn);
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        return console.error(`failed to fetch data for ${filename}`, err);
      }
      fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
          return console.error(`failed to write to ${filename}`, err);
        }
        console.log(`${filename} saved`);
      });
    }
  );
};

module.exports = fetchRecords;
