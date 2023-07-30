import { LEVELS } from '~/constants';
import { GRIPS } from '~/data';

export const filterVariations = (variations, options = {}) => {
  const filteredByLevel = variations.filter(({ level }) => {
    const selectedLevel = options.level;
    if (!selectedLevel) return true;
    return LEVELS.indexOf(level) <= LEVELS.indexOf(selectedLevel);
  });

  return filteredByLevel.reduce((gripVariations, variation) => {
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
      filteredByKettlebells.includes(grip),
    );

    const newGripVariations = [];

    for (const grip of filteredGrips) {
      if (grips.includes(grip.id))
        newGripVariations.push({ ...variation, selectedGrip: grip });
    }

    return [...gripVariations, ...newGripVariations];
  }, []);
};
