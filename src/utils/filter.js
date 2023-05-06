export const filterVariations = (
  variations,
  { selectedLevel, selectedGrip, selectedPrimaryFocus, selectedSecondaryFocus }
) => {
  const filteredByLevel = variations.filter(({ level = [] }) => {
    if (!selectedLevel) return true;
    const [levelId] = level;
    return levelId === selectedLevel.id;
  });

  const filteredByLevelAndGrip = filteredByLevel.filter(({ grips = [] }) => {
    if (!selectedGrip) return true;
    return grips.includes(selectedGrip.id);
  });

  const primaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      if (!selectedPrimaryFocus) return true;

      const includesPrimaryFocus =
        selectedPrimaryFocus.id &&
        movementPatterns.includes(selectedPrimaryFocus.id);

      return includesPrimaryFocus;
    }
  );

  const secondaryVariations = filteredByLevelAndGrip.filter(
    ({ movementPatterns = [] }) => {
      if (!selectedSecondaryFocus) return true;

      const includesSecondaryFocus =
        selectedSecondaryFocus.id &&
        movementPatterns.includes(selectedSecondaryFocus.id);

      return includesSecondaryFocus;
    }
  );

  return [primaryVariations, secondaryVariations];
};
