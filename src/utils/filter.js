import { GRIPS } from '~/data';

import { shuffleArray } from './shuffle';

export const filterVariations = (variations, options = {}) => {
  const filteredByLevel = variations.filter(({ level }) => {
    const selectedLevel = options.level;
    if (!selectedLevel) return true;
    return level === selectedLevel;
  });

  const filteredByLevelAndGrip = filteredByLevel.reduce(
    (gripVariations, variation) => {
      const { grips = [] } = variation;

      const armsSelection = options.arms;
      const filteredByArms = GRIPS.filter(({ arms }) => {
        return (
          arms === armsSelection || !armsSelection || armsSelection === 'Any'
        );
      });

      const kettlebellsSelection = options.kettlebells;
      const filteredByKettlebells = GRIPS.filter(({ kettlebells }) => {
        return (
          kettlebells === kettlebellsSelection ||
          !kettlebellsSelection ||
          kettlebellsSelection === 'Any'
        );
      });

      const filteredGrips = filteredByArms.filter((grip) =>
        filteredByKettlebells.includes(grip)
      );

      const newGripVariations = [];

      for (const grip of filteredGrips) {
        if (grips.includes(grip.id))
          newGripVariations.push({ ...variation, selectedGrip: grip });
      }

      return [...gripVariations, ...newGripVariations];
    },
    []
  );

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
