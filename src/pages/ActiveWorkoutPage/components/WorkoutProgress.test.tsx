import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './WorkoutProgress.stories';

const {
  VolumeGoalNoProgress,
  VolumeGoal25PercentComplete,
  VolumeGoal50PercentComplete,
  VolumeGoal75PercentComplete,
  VolumeGoal100PercentComplete,
  VolumeGoalExceeded,
  VolumeGoalSignificantlyExceeded,
  VolumeGoalLargeValues,
  VolumeGoalLargeValuesHalfway,
  VolumeGoalVeryLargeValues,
  VolumeGoalZero,
  TimeGoal,
  RoundsGoal,
} = composeStories(stories);

describe('WorkoutProgress - volume goals', () => {
  describe('progress percentage calculation', () => {
    test('displays 100% remaining when no volume completed (0%)', () => {
      render(<VolumeGoalNoProgress />);

      // 0% complete means 100% remaining
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    test('displays 75% remaining when 25% complete', () => {
      render(<VolumeGoal25PercentComplete />);

      // 25% complete means 75% remaining
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    test('displays 50% remaining when 50% complete', () => {
      render(<VolumeGoal50PercentComplete />);

      // 50% complete means 50% remaining
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    test('displays 25% remaining when 75% complete', () => {
      render(<VolumeGoal75PercentComplete />);

      // 75% complete means 25% remaining
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    test('displays 0% remaining when 100% complete', () => {
      render(<VolumeGoal100PercentComplete />);

      // 100% complete means 0% remaining
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('progress description with volume goals', () => {
    test('displays "volume remaining" when workoutGoalUnits is kilograms', () => {
      render(<VolumeGoal50PercentComplete />);

      expect(screen.getByText('volume remaining')).toBeInTheDocument();
    });

    test('does not display "volume remaining" for minutes goal', () => {
      render(<TimeGoal />);

      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();
      expect(screen.getByText('time remaining')).toBeInTheDocument();
    });

    test('does not display "volume remaining" for rounds goal', () => {
      render(<RoundsGoal />);

      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();
      expect(screen.getByText('rounds remaining')).toBeInTheDocument();
    });
  });

  describe('zero goal edge case', () => {
    test('displays no progress information when workoutGoal is 0', () => {
      render(<VolumeGoalZero />);

      // When goal is 0, no value or description should be displayed
      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();

      // The infinity symbol should be displayed instead
      const progressBar = screen.getByText('∞');
      expect(progressBar).toBeInTheDocument();
    });

    test('does not display percentage when workoutGoal is 0', () => {
      render(<VolumeGoalZero />);

      // Should not display any percentage values
      expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
    });
  });

  describe('remaining volume capped at zero', () => {
    test('displays 0% remaining when completedVolume exceeds workoutGoal', () => {
      render(<VolumeGoalExceeded />);

      // When completed > goal, remaining should be capped at 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('displays 0% remaining when completedVolume significantly exceeds workoutGoal', () => {
      render(<VolumeGoalSignificantlyExceeded />);

      // Even with large excess, remaining should be 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('never displays negative percentage', () => {
      render(<VolumeGoalExceeded />);

      // Verify no negative values are displayed
      const text = screen.getByText('0%');
      expect(text).toBeInTheDocument();
      expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
    });
  });

  describe('very large volume values', () => {
    test('handles large volume values correctly (10000kg goal)', () => {
      render(<VolumeGoalLargeValues />);

      // 1200 / 10000 = 12% complete, so 88% remaining
      expect(screen.getByText('88%')).toBeInTheDocument();
    });

    test('calculates percentage correctly with large completed volume', () => {
      render(<VolumeGoalLargeValuesHalfway />);

      // 7500 / 10000 = 75% complete, so 25% remaining
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    test('handles very large values without overflow', () => {
      render(<VolumeGoalVeryLargeValues />);

      // 50000 / 100000 = 50% complete, so 50% remaining
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });
});
