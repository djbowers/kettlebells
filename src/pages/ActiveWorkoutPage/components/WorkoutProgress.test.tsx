import { render, screen } from '@testing-library/react';

import { WorkoutProgress } from './WorkoutProgress';

describe('WorkoutProgress - volume goals', () => {
  const defaultProps = {
    completedRounds: 0,
    completedVolume: 0,
    formattedTimeRemaining: '10:00',
    handleClickPause: vi.fn(),
    remainingMilliseconds: 600000,
    workoutGoal: 1000,
    workoutGoalUnits: 'kilograms',
    workoutTimerPaused: false,
  };

  describe('progress percentage calculation', () => {
    test('displays 100% remaining when no volume completed (0%)', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={0}
          workoutGoal={1000}
        />,
      );

      // 0% complete means 100% remaining
      expect(screen.getByText('100%')).toBeInTheDocument();
    });

    test('displays 75% remaining when 25% complete', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={250}
          workoutGoal={1000}
        />,
      );

      // 25% complete means 75% remaining
      expect(screen.getByText('75%')).toBeInTheDocument();
    });

    test('displays 50% remaining when 50% complete', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={500}
          workoutGoal={1000}
        />,
      );

      // 50% complete means 50% remaining
      expect(screen.getByText('50%')).toBeInTheDocument();
    });

    test('displays 25% remaining when 75% complete', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={750}
          workoutGoal={1000}
        />,
      );

      // 75% complete means 25% remaining
      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    test('displays 0% remaining when 100% complete', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={1000}
          workoutGoal={1000}
        />,
      );

      // 100% complete means 0% remaining
      expect(screen.getByText('0%')).toBeInTheDocument();
    });
  });

  describe('progress description with volume goals', () => {
    test('displays "volume remaining" when workoutGoalUnits is kilograms', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          workoutGoalUnits="kilograms"
          completedVolume={500}
          workoutGoal={1000}
        />,
      );

      expect(screen.getByText('volume remaining')).toBeInTheDocument();
    });

    test('does not display "volume remaining" for minutes goal', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          workoutGoalUnits="minutes"
          workoutGoal={10}
        />,
      );

      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();
      expect(screen.getByText('time remaining')).toBeInTheDocument();
    });

    test('does not display "volume remaining" for rounds goal', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          workoutGoalUnits="rounds"
          workoutGoal={5}
          completedRounds={2}
        />,
      );

      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();
      expect(screen.getByText('rounds remaining')).toBeInTheDocument();
    });
  });

  describe('zero goal edge case', () => {
    test('displays no progress information when workoutGoal is 0', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          workoutGoal={0}
          completedVolume={100}
        />,
      );

      // When goal is 0, no value or description should be displayed
      expect(screen.queryByText('volume remaining')).not.toBeInTheDocument();
      
      // The infinity symbol should be displayed instead
      const progressBar = screen.getByText('∞');
      expect(progressBar).toBeInTheDocument();
    });

    test('does not display percentage when workoutGoal is 0', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          workoutGoal={0}
          completedVolume={500}
        />,
      );

      // Should not display any percentage values
      expect(screen.queryByText(/\d+%/)).not.toBeInTheDocument();
    });
  });

  describe('remaining volume capped at zero', () => {
    test('displays 0% remaining when completedVolume exceeds workoutGoal', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={1200}
          workoutGoal={1000}
        />,
      );

      // When completed > goal, remaining should be capped at 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('displays 0% remaining when completedVolume significantly exceeds workoutGoal', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={2500}
          workoutGoal={1000}
        />,
      );

      // Even with large excess, remaining should be 0%
      expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('never displays negative percentage', () => {
      render(
        <WorkoutProgress
          {...defaultProps}
          completedVolume={1500}
          workoutGoal={1000}
        />,
      );

      // Verify no negative values are displayed
      const text = screen.getByText('0%');
      expect(text).toBeInTheDocument();
      expect(screen.queryByText(/-\d+%/)).not.toBeInTheDocument();
    });
  });
});
