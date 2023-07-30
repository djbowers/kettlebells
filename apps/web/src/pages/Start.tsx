import { Button, Input, Select, SelectOption } from '../components';
import { MouseEventHandler, ReactNode, useState } from 'react';

export const Start = () => {
  const [trainingGoal, setTrainingGoal] = useState<SelectOption>(goals[0]);

  const [push, setPush] = useState<boolean>(false);
  const handleTogglePush = () => setPush((prev) => !prev);

  const [pull, setPull] = useState<boolean>(false);
  const handleTogglePull = () => setPull((prev) => !prev);

  const [hinge, setHinge] = useState<boolean>(false);
  const handleToggleHinge = () => setHinge((prev) => !prev);

  const [squat, setSquat] = useState<boolean>(false);
  const handleToggleSquat = () => setSquat((prev) => !prev);

  return (
    <div className="w-full text-white">
      <Section>
        <div className="text-xl">Let's get started!</div>
      </Section>

      <Section>
        <div>Training Goal</div>
        <Select
          value={trainingGoal}
          onChange={(value) => setTrainingGoal(value)}
          options={goals}
        />
      </Section>

      <Section>
        <div>Movements</div>
        <div className="grid grid-cols-2 gap-2">
          <Movement checked={push} onClick={handleTogglePush} label="Push" />
          <Movement checked={pull} onClick={handleTogglePull} label="Pull" />
          <Movement checked={hinge} onClick={handleToggleHinge} label="Hinge" />
          <Movement checked={squat} onClick={handleToggleSquat} label="Squat" />
        </div>
      </Section>
    </div>
  );
};

const Section = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-1 mb-2">{children}</div>;
};

const goals: SelectOption[] = [
  { id: 1, name: 'Max Strength' },
  { id: 2, name: 'Strength-Endurance' },
  { id: 3, name: 'Hypertrophy' },
  { id: 4, name: 'Aerobic Endurance' },
];

interface MovementProps {
  checked: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  label: string;
}

const Movement = ({ checked, onClick, label }: MovementProps) => {
  return (
    <Button
      className="flex items-center gap-1 border rounded-md px-1 py-0.5 hover:border-yellow-300"
      onClick={onClick}
    >
      <Input type="checkbox" checked={checked} readOnly={true} />
      <div className="text-center">{label}</div>
    </Button>
  );
};
