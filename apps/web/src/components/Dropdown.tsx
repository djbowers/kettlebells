import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode } from 'react';

import { Transition } from './Transition';

interface Props {
  trigger?: ReactNode;
  options?: ReactNode[];
}

export const Dropdown = ({
  trigger = <EllipsisVerticalIcon className="h-2.5 w-2.5" />,
  options = [],
}: Props) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center">{trigger}</Menu.Button>

      <Transition>
        <Menu.Items className="bg-layout-darker absolute right-0 mt-1 min-w-[150px] rounded-md p-1 shadow-lg">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              <div className="text-default hover:bg-layout-darkest flex w-full cursor-pointer items-center rounded-md text-sm">
                {option}
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
