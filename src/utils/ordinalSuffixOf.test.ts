import { ordinalSuffixOf } from './ordinalSuffixOf';

test('adds ordinal suffix correctly', () => {
  expect(ordinalSuffixOf(1)).toBe('1st');
  expect(ordinalSuffixOf(2)).toBe('2nd');
  expect(ordinalSuffixOf(3)).toBe('3rd');
  expect(ordinalSuffixOf(4)).toBe('4th');
  expect(ordinalSuffixOf(5)).toBe('5th');
  expect(ordinalSuffixOf(11)).toBe('11th');
  expect(ordinalSuffixOf(12)).toBe('12th');
  expect(ordinalSuffixOf(13)).toBe('13th');
  expect(ordinalSuffixOf(1000)).toBe('1000th');
});
