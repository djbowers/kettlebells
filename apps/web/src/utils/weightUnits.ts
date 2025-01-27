import { WeightUnit } from '~/types';

export const getWeightUnitLabel = (unit: WeightUnit | null) => {
  if (unit === 'kilograms') return 'kg';
  if (unit === 'pounds') return 'lb';
  return '';
};
