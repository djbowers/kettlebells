import { AllProviders } from './src/providers';
import { TabNavigator } from './src/stacks';

export default function App() {
  return (
    <AllProviders>
      <TabNavigator />
    </AllProviders>
  );
}
