import { Dispatch, SetStateAction } from 'react';
import { ModifyCountButtons } from './ModifyCountButtons';

export const RepSchemePicker = ({
  onChange,
  value,
  index,
}: {
  onChange: Dispatch<SetStateAction<number[]>>;
  value: number[];
  index: number;
}) => {
  const handleIncrementReps = () => {
    onChange((prev) => {
      const reps = [...prev];
      reps[index] += 1;
      return reps;
    });
  };
  const handleDecrementReps = () => {
    onChange((prev) => {
      const reps = [...prev];
      if (reps[index] <= 1) return reps;
      reps[index] -= 1;
      return reps;
    });
  };

  return (
    <ModifyCountButtons
      onClickMinus={handleDecrementReps}
      onClickPlus={handleIncrementReps}
      text="reps"
      value={value[index].toString()}
    />
  );
};
