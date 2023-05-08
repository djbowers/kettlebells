import { GRIPS } from '~/data';

export const filterVariations = (variations, options = {}) => {
  const filteredByLevel = variations.filter(({ level }) => {
    const selectedLevel = options.level;
    if (!selectedLevel) return true;
    return level === selectedLevel;
  });

  const filteredByLevelAndGrip = filteredByLevel.filter(({ grips = [] }) => {
    const selectedGrip = GRIPS.find(({ name }) => name === options.grip);
    if (!selectedGrip) return true;
    return grips.includes(selectedGrip.id);
  });

  const primaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      const selectedPrimaryFocus = options.primaryFocus;
      if (!selectedPrimaryFocus || selectedPrimaryFocus === 'Any') {
        return true;
      }
      return movementPatterns.includes(selectedPrimaryFocus);
    }
  );

  const secondaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      const selectedSecondaryFocus = options.secondaryFocus;
      if (!selectedSecondaryFocus || selectedSecondaryFocus === 'Any') {
        return true;
      }
      return movementPatterns.includes(selectedSecondaryFocus);
    }
  );

  return [primaryVariations, secondaryVariations];
};
