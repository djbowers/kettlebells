import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

export const RPESelector = () => {
  const [rpeValue, setRpeValue] = useState('ideal');

  return (
    <RadioGroup
      value={rpeValue}
      onChange={setRpeValue}
      className="flex flex-col gap-2 text-center"
    >
      <RadioGroup.Label>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-0.5">
            <div className="text-subdued text-sm font-medium uppercase">
              Exertion Rating
            </div>
            <div className="text-sm font-medium">
              How difficult was moving 2525 kg in 21 min?
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div
              className={clsx(
                'text-lg font-medium',
                RPE_CONFIG[rpeValue].textColor,
              )}
            >
              {RPE_CONFIG[rpeValue].text}
            </div>
            <div className="text-sm font-medium">
              {RPE_CONFIG[rpeValue].description}
            </div>
          </div>
        </div>
      </RadioGroup.Label>

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
    <RadioGroup.Option value={rpeValue}>
      {({ checked }) => (
        <div className="flex flex-col items-center gap-0.5 p-1">
          <div
            className={clsx(
              'h-3 w-3 rounded-full',
              RPE_CONFIG[rpeValue].bgColor,
              {
                'ring ring-offset-2': checked,
                [RPE_CONFIG[rpeValue].ringColor]: checked,
              },
            )}
          />
          <div
            className={clsx('rounded-xl px-1 py-0.5 text-center font-medium', {
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

const RPE_CONFIG: {
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