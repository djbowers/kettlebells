const Airtable = {
  configure: () => {},
  base: () => base,
};

const base = () => table;

const table = {
  select: () => ({ eachPage: () => exercises }),
};

const exercises = [];

export default Airtable;
