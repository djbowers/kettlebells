/* do not change this file, it is auto generated by storybook. */
import { decorators, parameters } from "./preview";
import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";
import "@storybook/addon-ondevice-actions/register";
import "@storybook/addon-ondevice-controls/register";
import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    files: "**/*.stories.@(mdx|tsx|ts|jsx|js)",
    directory: "./src",
    importPathMatcher:
      "^\\.[\\\\/](?:src(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(mdx|tsx|ts|jsx|js))$",
  },
];

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./src/screens/ActiveWorkoutScreen/ActiveWorkoutScreen.stories.jsx": require("../src/screens/ActiveWorkoutScreen/ActiveWorkoutScreen.stories.jsx"),
    "./src/screens/FinishedWorkoutScreen/FinishedWorkoutScreen.stories.jsx": require("../src/screens/FinishedWorkoutScreen/FinishedWorkoutScreen.stories.jsx"),
    "./src/screens/GenerateWorkoutScreen/GenerateWorkoutScreen.stories.jsx": require("../src/screens/GenerateWorkoutScreen/GenerateWorkoutScreen.stories.jsx"),
    "./src/screens/ReviewWorkoutScreen/components/ExerciseListItem.stories.jsx": require("../src/screens/ReviewWorkoutScreen/components/ExerciseListItem.stories.jsx"),
    "./src/screens/ReviewWorkoutScreen/ReviewWorkoutScreen.stories.jsx": require("../src/screens/ReviewWorkoutScreen/ReviewWorkoutScreen.stories.jsx"),
  };
};

configure(getStories, module, false);
