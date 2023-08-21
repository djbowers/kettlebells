import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';

import { Transition } from './Transition';

export type SelectOption = { id: number; name: string };

interface Props {
  value: SelectOption;
  onChange: (option: SelectOption) => void;
  options: SelectOption[];
}

export const Select = ({ value, onChange, options }: Props) => {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="flex items-center justify-between gap-2 rounded-md border px-1 py-0.5 hover:border-blue-300">
          {value.name}
          <ChevronUpDownIcon className="h-2.5 w-2.5 text-white" />
        </Listbox.Button>

        <Transition>
          <Listbox.Options className="absolute mt-1 rounded-md border bg-white p-1 text-gray-900">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                value={option}
                className="cursor-pointer rounded px-1 py-0.5 hover:bg-gray-300"
              >
                {option.name}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
