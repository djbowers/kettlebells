import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_MOVEMENT_OPTIONS, DEFAULT_WORKOUT_OPTIONS } from '~/contexts';

import * as stories from './StartWorkoutPage.stories';

const { Default } = composeStories(stories);

const startedAt = new Date();
vi.setSystemTime(startedAt);

describe('start workout page', () => {
  let startWorkout;

  beforeEach(() => {
    startWorkout = vi.fn();
    Default.parameters.updateWorkoutOptions = startWorkout;

    render(<Default />);
  });

  test('start button is disabled by default', () => {
    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeDisabled();
  });

  test('can change the workout goal to "rounds"', async () => {
    const workoutGoalUnits = screen.getByRole('tab', { name: 'Rounds' });
    await userEvent.click(workoutGoalUnits);

    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      workoutGoalUnits: 'rounds',
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
        },
      ],
      startedAt,
    });
  });

  test('entering a movement name enables start button', async () => {
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      movements: [
        {
          ...DEFAULT_MOVEMENT_OPTIONS,
          movementName: 'Clean and Press',
        },
      ],
      startedAt,
    });
  });

  test('can add new movements', async () => {
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));

    const movementInputs = screen.getAllByLabelText('Movement Input');
    expect(movementInputs).toHaveLength(2);
  });

  test('can remove movements', async () => {
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));

    const removeButtons = screen.getAllByRole('button', { name: '- Movement' });
    await userEvent.click(removeButtons[0]);

    const movementInputs = screen.getAllByLabelText('Movement Input');
    expect(movementInputs).toHaveLength(1);
  });

  test('can change movement name', async () => {
    await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    expect(movementInput).toHaveValue('Clean and Press');
  });

  describe('Weights', () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
    });

    test('can select "none" for bodyweight movements', async () => {
      await userEvent.click(screen.getByRole('tab', { name: 'None' }));
      await userEvent.type(screen.getByLabelText('Movement Input'), 'Pushups');
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Pushups',
            weightOneUnit: null,
            weightOneValue: null,
            weightTwoUnit: null,
            weightTwoValue: null,
          },
        ],
        startedAt,
      });
    });

    test('can select "2h" for two-handed movements', async () => {
      await userEvent.click(screen.getByRole('tab', { name: '2H' }));
      await userEvent.type(
        screen.getByLabelText('Movement Input'),
        'Kettlebell Swing',
      );
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Kettlebell Swing',
          },
        ],
        startedAt,
      });
    });

    test('can select "1h" for one-handed movements', async () => {
      await userEvent.click(screen.getByRole('tab', { name: '1H' }));
      await userEvent.type(
        screen.getByLabelText('Movement Input'),
        'Single Arm Press',
      );
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Single Arm Press',
            weightTwoValue: 0,
          },
        ],
        startedAt,
      });
    });

    test('can select "double" for two-weight movements', async () => {
      await userEvent.click(screen.getByRole('tab', { name: 'Double' }));
      await userEvent.type(
        screen.getByLabelText('Movement Input'),
        'Double Clean',
      );
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Double Clean',
            weightTwoValue: 16,
            weightTwoUnit: 'kilograms',
          },
        ],
        startedAt,
      });
    });
  });

  describe('Rep Scheme', () => {
    beforeEach(async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Movement' }));
      await userEvent.type(
        screen.getByLabelText('Movement Input'),
        'Test Movement',
      );
    });

    test('can add rungs', async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Rung' }));
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Test Movement',
            repScheme: [5, 5],
          },
        ],
        startedAt,
      });
    });

    test('can remove the last rung', async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Rung' }));
      await userEvent.click(screen.getByRole('button', { name: '- Rung' }));
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Test Movement',
            repScheme: [5],
          },
        ],
        startedAt,
      });
    });

    test('can increment reps for each rung independently', async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Rung' }));
      const incrementButtons = screen.getAllByRole('button', {
        name: '+ reps',
      });
      await userEvent.click(incrementButtons[0]);
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Test Movement',
            repScheme: [6, 5],
          },
        ],
        startedAt,
      });
    });

    test('can decrement reps for each rung independently', async () => {
      await userEvent.click(screen.getByRole('button', { name: '+ Rung' }));
      const decrementButtons = screen.getAllByRole('button', {
        name: '- reps',
      });
      await userEvent.click(decrementButtons[1]);
      await userEvent.click(screen.getByRole('button', { name: /Start/i }));

      expect(startWorkout).toHaveBeenCalledWith({
        ...DEFAULT_WORKOUT_OPTIONS,
        movements: [
          {
            ...DEFAULT_MOVEMENT_OPTIONS,
            movementName: 'Test Movement',
            repScheme: [5, 4],
          },
        ],
        startedAt,
      });
    });
  });
});
