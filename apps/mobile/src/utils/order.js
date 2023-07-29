import { TYPES } from '~/constants';

export const orderByType = (variations) => {
  const { BALLISTIC, GRIND, ACCESSORY } = TYPES;

  const ballistics = variations.filter(({ type }) => type === BALLISTIC);
  const grinds = variations.filter(({ type }) => type === GRIND);
  const accessories = variations.filter(({ type }) => type === ACCESSORY);

  return [...ballistics, ...grinds, ...accessories];
};
