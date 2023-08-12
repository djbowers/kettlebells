import Slider from '@react-native-community/slider';

import { DURATION_STEP, MAX_DURATION, MIN_DURATION } from '~/constants';
import { useAsyncStorage } from '~/hooks';

export const SelectDuration = ({ duration, onChangeDuration, storageKey }) => {
  const [writeDurationToStorage] = useAsyncStorage(
    storageKey,
    onChangeDuration,
  );

  const handleChangeDuration = (duration) => {
    onChangeDuration(duration);
    writeDurationToStorage(duration);
  };

  return (
    <Slider
      onValueChange={handleChangeDuration}
      maximumValue={MAX_DURATION}
      minimumValue={MIN_DURATION}
      step={DURATION_STEP}
      value={duration}
      accessibilityLabel="Select Duration"
    />
  );
};
