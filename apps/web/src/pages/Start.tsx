import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Session } from '@supabase/supabase-js';
import { useState } from 'react';

interface Props {
  session: Session;
}

export const Start = ({ session }: Props) => {
  return (
    <div className="w-full text-white">
      <div className="text-xl">Let's get started!</div>

      <div>Training Goal</div>
      <Select />

      <div>Movements</div>
      
    </div>
  );
};

const goals = [
  { id: 1, name: 'Max Strength' },
  { id: 2, name: 'Strength-Endurance' },
  { id: 3, name: 'Hypertrophy' },
  { id: 4, name: 'Aerobic Endurance' },
];

const Select = () => {
  const [trainingGoal, setTrainingGoal] = useState(goals[0]);

  return (
    <Listbox value={trainingGoal} onChange={setTrainingGoal}>
      <Listbox.Button className="flex items-center gap-2 border rounded-md py-0.5 px-1">
        {trainingGoal.name}
        <ChevronUpDownIcon className="h-2.5 w-2.5 text-white" />
      </Listbox.Button>
      <Listbox.Options className="border rounded-md p-1">
        {goals.map((person) => (
          <Listbox.Option
            key={person.id}
            value={person}
            className="rounded hover:bg-gray-500 cursor-pointer px-0.5"
          >
            {person.name}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
};
