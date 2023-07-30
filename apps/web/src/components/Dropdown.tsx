import { Transition } from './Transition';
import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';

interface Props {
  trigger?: ReactNode;
  options?: ReactNode[];
}

export const Dropdown = ({
  trigger = <EllipsisVerticalIcon className="w-2.5 h-2.5" />,
  options = [],
}: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center">{trigger}</Menu.Button>

      <Transition>
        <Menu.Items className="absolute right-0 mt-1 rounded-md bg-white shadow-lg min-w-[150px] p-1">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              <div className="flex w-full items-center rounded-md text-sm text-gray-900 hover:bg-gray-200 cursor-pointer">
                {option}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
