export const filterVariations = (
  variations,
  { selectedLevel, selectedGrip, selectedPrimaryFocus, selectedSecondaryFocus }
) => {
  return (
    variations

      // filter by level
      .filter(({ level = [] }) => {
        if (!selectedLevel) return true;
        const [levelId] = level;
        return levelId === selectedLevel.id;
      })

      // filter by grip
      .filter(({ grips = [] }) => {
        if (!selectedGrip) return true;
        return grips.includes(selectedGrip.id);
      })

      // filter by focus
      .filter(({ movementPatterns = [] }) => {
        if (!selectedPrimaryFocus) return true;

        const includesPrimaryFocus =
          selectedPrimaryFocus?.id &&
          movementPatterns.includes(selectedPrimaryFocus.id);

        if (!selectedSecondaryFocus) return includesPrimaryFocus;

        const includesSecondaryFocus =
          selectedSecondaryFocus?.id &&
          movementPatterns.includes(selectedSecondaryFocus.id);

        return includesPrimaryFocus || includesSecondaryFocus;
      })
  );
};
