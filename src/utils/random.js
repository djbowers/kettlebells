export const sampleRandomValue = (values = []) => {
  return values[Math.floor(Math.random() * values.length)];
};
