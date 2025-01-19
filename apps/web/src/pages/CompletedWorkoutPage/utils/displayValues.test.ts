import {
  getBellWeightsDisplayValue,
  getRepSchemeDisplayValue,
} from './displayValues';

describe('getBellWeightsDisplayValue', () => {
  test('returns single bell weight as string', () => {
    expect(getBellWeightsDisplayValue([24, 0])).toBe('24');
  });

  test('returns two bell weights separated by slash', () => {
    expect(getBellWeightsDisplayValue([24, 16])).toBe('24 / 16');
  });

  test('handles zero weights', () => {
    expect(getBellWeightsDisplayValue([0, 0])).toBe('0');
  });
});

describe('getRepSchemeDisplayValue', () => {
  test('returns single rep count as string for double bells', () => {
    expect(getRepSchemeDisplayValue([5], [24, 24])).toBe('5');
  });

  test('returns multiple rep counts separated by comma for double bells', () => {
    expect(getRepSchemeDisplayValue([5, 3, 2], [24, 24])).toBe('5, 3, 2');
  });

  test('duplicates reps for unilateral (single bell) exercises', () => {
    expect(getRepSchemeDisplayValue([5, 3], [24, 0])).toBe('5 / 5, 3 / 3');
  });

  test('returns single rep count as is when no bells specified', () => {
    expect(getRepSchemeDisplayValue([5], [0, 0])).toBe('5');
  });
});
