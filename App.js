import Constants from 'expo-constants';

import { AllProviders } from './src/providers';
import { TabNavigator } from './src/stacks';

function App() {
  return (
    <AllProviders>
      <TabNavigator />
    </AllProviders>
  );
}

// Default to rendering your app
let AppEntryPoint = App;

// Render Storybook if storybookEnabled is true
if (Constants.expoConfig.extra?.storybookEnabled === 'true') {
  AppEntryPoint = require('./.storybook').default;
}

export default AppEntryPoint;
