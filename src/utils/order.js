import { TYPES } from '~/constants';

const { BALLISTIC, GRIND, ACCESSORY } = TYPES;

export const orderByType = (variations) => {
  const ballistics = variations.filter(({ type }) => type === BALLISTIC);
  const grinds = variations.filter(({ type }) => type === GRIND);
  const accessories = variations.filter(({ type }) => type === ACCESSORY);

  return [...ballistics, ...grinds, ...accessories];
};
