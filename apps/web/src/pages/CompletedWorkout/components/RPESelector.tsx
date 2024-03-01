import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

import { Badge } from '~/components';
import { WorkoutLog } from '~/types';

import { getBellWeightsDisplayValue, getRepSchemeDisplayValue } from '../utils';

export interface RPESelectorProps {
  bellWeights: WorkoutLog['bells'];
  onSelectRPE: (selectedRPE: WorkoutLog['rpe']) => void;
  repScheme: WorkoutLog['repScheme'];
  rpeValue: WorkoutLog['rpe'];
}

export const RPESelector = ({
  bellWeights,
  onSelectRPE,
  repScheme,
  rpeValue,
}: RPESelectorProps) => {
  const workoutLoad = bellWeights.reduce((total, bell) => total + bell, 0);
  const bellWeightsDisplayValue = getBellWeightsDisplayValue(bellWeights);

  return (
    <RadioGroup
      value={rpeValue}
      onChange={onSelectRPE}
      className="bg-layout-darker flex flex-col gap-2 rounded-2xl p-2"
    >
      <RadioGroup.Label className="text-subdued text-sm font-semibold uppercase">
        Exertion Rating
      </RadioGroup.Label>

      <RadioGroup.Description as="div" className="flex flex-col gap-1">
        <div className="text-default text-center text-sm font-medium">
          How difficult was your workout?
        </div>

        {rpeValue && (
          <div className="flex flex-wrap items-center justify-center gap-1">
            <Badge
              size="small"
              label={RPE_CONFIG[rpeValue].text}
              className={clsx(RPE_CONFIG[rpeValue].bgColor, 'text-inverse')}
            />

            <div className="text-default text-center text-sm">
              {RPE_CONFIG[rpeValue].description}
            </div>
          </div>
        )}
      </RadioGroup.Description>

      <div className="grid grid-cols-5 gap-2 px-3">
        <Option rpeValue="noEffort" />
        <Option rpeValue="easy" />
        <Option rpeValue="ideal" />
        <Option rpeValue="hard" />
        <Option rpeValue="maxEffort" />
      </div>
    </RadioGroup>
  );
};

const Option = ({ rpeValue }: { rpeValue: string }) => {
  return (
    <RadioGroup.Option
      value={rpeValue}
      className="flex flex-col items-center gap-0.5"
    >
      {({ checked }) => (
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className={clsx(
              'h-2.5 w-2.5 rounded-full hover:ring',
              RPE_CONFIG[rpeValue].bgColor,
              RPE_CONFIG[rpeValue].ringColor,
              'ring-offset-layout-darker ring-offset-4',
              { ring: checked },
            )}
          />
          <div
            className={clsx('rounded-xl text-center text-sm font-medium', {
              'text-default': checked,
              'text-subdued': !checked,
            })}
          >
            {RPE_CONFIG[rpeValue].text}
          </div>
        </div>
      )}
    </RadioGroup.Option>
  );
};

export const RPE_CONFIG: {
  [key: string]: {
    bgColor: string;
    description: string;
    ringColor: string;
    text: string;
    textColor: string;
  };
} = {
  noEffort: {
    bgColor: 'bg-gray-300',
    description: 'Felt like no workout at all.',
    ringColor: 'ring-gray-300',
    text: 'No Effort',
    textColor: 'text-gray-500',
  },
  easy: {
    bgColor: 'bg-green-400',
    description: 'Comfortable and sustainable effort.',
    ringColor: 'ring-green-400',
    text: 'Easy',
    textColor: 'text-green-500',
  },
  ideal: {
    bgColor: 'bg-yellow-400',
    description: 'Challenging yet manageable workout.',
    ringColor: 'ring-yellow-400',
    text: 'Ideal',
    textColor: 'text-yellow-500',
  },
  hard: {
    bgColor: 'bg-orange-400',
    description: 'Pushed near your limits, quite tough.',
    ringColor: 'ring-orange-400',
    text: 'Hard',
    textColor: 'text-orange-500',
  },
  maxEffort: {
    bgColor: 'bg-red-500',
    description: 'Peak exertion, pushed to the absolute limit.',
    ringColor: 'ring-red-500',
    text: 'Max Effort',
    textColor: 'text-red-600',
  },
};
