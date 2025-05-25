import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';

import * as stories from './WorkoutHistoryItem.stories';

const { Default, WithTimers, RoundsGoal } = composeStories(stories);

vi.setSystemTime(new Date('2024-01-02T12:00:00'));

describe('workout overview', () => {
  test('displays the date of the workout', async () => {
    render(<Default />);
    await screen.findByText('Monday, Jan 1');
  });

  test('displays the time range of the workout', async () => {
    render(<Default />);
    await screen.findByText('12:00 PM - 1:15 PM');
  });

  test('displays workout details', async () => {
    render(<Default />);
    await screen.findByText('The Giant 3.0 W1D2');
  });
});

describe('workout options', () => {
  test('displays the movements performed in the workout', async () => {
    render(<Default />);
    await screen.findByText('Single Arm Front Squat');
    await screen.findByText('Single Arm Overhead Press');
  });

  test('displays rep scheme', async () => {
    render(<Default />);
    expect(screen.getAllByLabelText('Rep Scheme')[0]).toHaveTextContent(
      '5 / 5',
    );
  });

  test('displays weights and number of hands used', async () => {
    render(<Default />);
    expect(screen.getAllByLabelText('Weights')[0]).toHaveTextContent(
      '16 kg (1h)',
    );
  });

  test('displays workout goal', async () => {
    render(<RoundsGoal />);
    expect(screen.getByLabelText('Goal')).toHaveTextContent('15 rounds');
  });

  test('displays interval timer', async () => {
    render(<WithTimers />);
    expect(screen.getByLabelText('Intervals')).toHaveTextContent('60s');
  });

  test('displays rest timer', async () => {
    render(<WithTimers />);
    expect(screen.getByLabelText('Rest')).toHaveTextContent('30s');
  });
});

describe('workout summary', () => {
  test('displays the duration of the workout', async () => {
    render(<Default />);
    expect(screen.getByLabelText('Elapsed')).toHaveTextContent('1h 15m');
  });

  test('displays number of rounds completed', async () => {
    render(<Default />);
    expect(screen.getByLabelText('Rounds')).toHaveTextContent('10');
  });

  test('displays number of reps completed', async () => {
    render(<Default />);
    expect(screen.getByLabelText('Reps')).toHaveTextContent('50');
  });

  test('displays volume completed in the workout', async () => {
    render(<Default />);
    expect(screen.getByLabelText('Volume')).toHaveTextContent('1000 kg');
  });
});
