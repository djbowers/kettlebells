import { render, screen } from '../testing';
import { GenerateWorkoutScreen } from './GenerateWorkoutScreen';

test('renders text', async () => {
  render(<GenerateWorkoutScreen />);
  await screen.findByText("Let's get started!");
});
