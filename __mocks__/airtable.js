const exercises = [
  {
    focus: 'Core',
    id: 'recj5qYc9O3ENiaYy',
    level: 'Beginner',
    name: 'Knees to Chest',
  },
  {
    focus: 'Core',
    id: 'recSWYKMcsMxzf0yO',
    level: 'Beginner',
    name: 'Overhead Situp',
  },
  {
    focus: 'Core',
    id: 'recyMlxTdG7GOkNEu',
    level: 'Beginner',
    name: 'Cross Swing',
  },
  {
    focus: 'Core',
    id: 'recbCy7M87unTSaTt',
    level: 'Beginner',
    name: 'Oblique Hip Raise',
  },
  {
    focus: 'Core',
    id: 'recFNngnvJNHUENLH',
    level: 'Beginner',
    name: 'Standing Side Bend',
  },
  {
    focus: 'Core',
    id: 'recwcVdvg5btTBD5z',
    level: 'Beginner',
    name: 'Around the Body Swing',
  },
  {
    focus: 'Core',
    id: 'recCGRXvSDPY7djBh',
    level: 'Beginner',
    name: 'Seated Oblique Swing',
  },
];

const Airtable = {
  configure: () => {},
  base: () => base,
};

const base = () => table;

const table = {
  select: () => ({ eachPage: () => exercises }),
};

export default Airtable;
