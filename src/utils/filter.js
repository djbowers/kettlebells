export const filterVariations = (
  variations,
  { selectedLevel, selectedGrip, selectedPrimaryFocus, selectedSecondaryFocus }
) => {
  const filteredByLevel = variations.filter(({ level }) => {
    if (!selectedLevel) return true;
    return level === selectedLevel;
  });

  const filteredByLevelAndGrip = filteredByLevel.filter(({ grips = [] }) => {
    if (!selectedGrip) return true;
    return grips.includes(selectedGrip.id);
  });

  const primaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      if (!selectedPrimaryFocus) return true;
      return movementPatterns.includes(selectedPrimaryFocus);
    }
  );

  const secondaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      if (!selectedSecondaryFocus) return true;
      return movementPatterns.includes(selectedSecondaryFocus);
    }
  );

  return [primaryVariations, secondaryVariations];
};
