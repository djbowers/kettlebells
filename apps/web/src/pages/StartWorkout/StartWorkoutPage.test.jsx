import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DEFAULT_WORKOUT_OPTIONS } from '~/contexts';

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

  test('entering a movement name enables start button', async () => {
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      movements: ['Clean and Press'],
      startedAt,
    });
  });

  test('can enter multiple movements', async () => {
    await userEvent.type(
      screen.getAllByLabelText('Movement Input')[0],
      'Clean and Press',
    );

    await userEvent.click(
      screen.getByRole('button', {
        name: '+ Movement',
      }),
    );

    await userEvent.type(
      screen.getAllByLabelText('Movement Input')[1],
      'Front Squat',
    );

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      movements: ['Clean and Press', 'Front Squat'],
      startedAt,
    });
  });

  test('can change the weights of the bells', async () => {
    const addBellButton = screen.getByRole('button', {
      name: '+ Bell',
    });
    await userEvent.click(addBellButton);

    const bellInputs = screen.getAllByLabelText('Bell Input');
    await userEvent.clear(bellInputs[0]);
    await userEvent.type(bellInputs[0], '20');
    await userEvent.clear(bellInputs[1]);
    await userEvent.type(bellInputs[1], '24');

    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      bells: [20, 24],
      isOneHanded: null,
      movements: ['Clean and Press'],
      startedAt,
    });
  });

  test('can create bodyweight only workouts', async () => {
    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Pull-Ups');

    expect(screen.getAllByLabelText('Bell Input')).toHaveLength(1);

    const bodyweightOnlyButton = screen.getByRole('button', {
      name: /Bodyweight only/i,
    });
    await userEvent.click(bodyweightOnlyButton);

    expect(screen.queryAllByLabelText('Bell Input')).toHaveLength(0);

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      bells: [0, 0],
      isOneHanded: null,
      movements: ['Pull-Ups'],
      startedAt,
    });
  });

  test('can toggle between one-handed and two-handed for single bell workouts', async () => {
    const bellInput = screen.getByLabelText('Bell Input');
    await userEvent.clear(bellInput);
    await userEvent.type(bellInput, '20');

    const handSelector = screen.getByRole('button', { name: '1H' });
    await userEvent.click(handSelector);
    expect(handSelector).toHaveTextContent('2H');

    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Two-Handed Swing');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      bells: [20, 0],
      isOneHanded: false,
      movements: ['Two-Handed Swing'],
      startedAt,
    });
  });

  test('can change the workout goal to "rounds"', async () => {
    const workoutGoalUnits = screen.getByRole('tab', { name: 'Rounds' });
    await userEvent.click(workoutGoalUnits);

    const movementInput = screen.getByLabelText('Movement Input');
    await userEvent.type(movementInput, 'Clean and Press');

    const startButton = screen.getByRole('button', { name: /Start/i });
    expect(startButton).toBeEnabled();
    await userEvent.click(startButton);

    expect(startWorkout).toHaveBeenCalledTimes(1);
    expect(startWorkout).toHaveBeenCalledWith({
      ...DEFAULT_WORKOUT_OPTIONS,
      workoutGoalUnits: 'rounds',
      movements: ['Clean and Press'],
      startedAt,
    });
  });
});
