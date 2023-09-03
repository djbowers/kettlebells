import { PlayPauseIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/components';
import { useSession } from '~/contexts';
import { useTimer } from '~/hooks';
import { supabase } from '~/supabaseClient';
import { WorkoutOptions } from '~/types';

interface Props {
  startedAt: Date;
  workoutOptions: WorkoutOptions;
}

export const ActiveWorkout = ({
  startedAt,
  workoutOptions: { task, reps, notes, minutes, bells},
}: Props) => {
  const { user } = useSession();
  const navigate = useNavigate();
  const [timeRemaining, { seconds, togglePause }] = useTimer(minutes);
  const [currentRound, setCurrentRound] = useState<number>(1);

  const totalSeconds = minutes * 60;
  const completedPercentage = ((totalSeconds - seconds) / totalSeconds) * 100;
  const completedRounds = currentRound - 1;
  const completedReps = completedRounds * reps;

  const handleClickPlus = () => setCurrentRound((prev) => (prev += 1));
  const handleClickPlayPause = () => togglePause();
  const handleClickFinish = async () => {
    const { error } = await supabase.from('practices').insert({
      started_at: startedAt.toISOString(),
      completed_at: new Date().toISOString(),
      user_id: user.id,
      task,
      notes,
      minutes,
      reps: [reps],
      completed_rounds: completedRounds,
      bells,
    });
    if (error) console.error(error);
    else navigate('/history');
  };

  return (
    <>
      <Progress completedPercentage={completedPercentage} />

      <div className="flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-medium">
            {task} <span className="text-lg text-gray-500">{notes}</span>
          </div>
          <div>{timeRemaining}</div>
        </div>

        <Button
          className="flex w-full items-center justify-center rounded border border-gray-700 py-1"
          onClick={handleClickPlayPause}
        >
          <PlayPauseIcon className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-3 py-4">
        <div className="text-2xl font-medium">Round {currentRound}</div>
        <div className="text-6xl font-medium">
          {reps} <span className="text-2xl">reps</span>
        </div>
        <Button
          className="flex w-full items-center justify-center rounded bg-blue-500 py-1"
          onClick={handleClickPlus}
        >
          <PlusIcon className="h-4 w-4 font-bold" />
        </Button>
        <div className="text-md">
          Completed {completedRounds} rounds ({completedReps} reps)
        </div>
      </div>

      <div>
        <Button
          className="flex w-full items-center justify-center rounded border border-gray-700 py-1"
          onClick={handleClickFinish}
        >
          <div>FINISH WORKOUT</div>
        </Button>
      </div>
    </>
  );
};

const Progress = ({ completedPercentage }: { completedPercentage: number }) => {
  return (
    <div className="h-5 w-full rounded bg-neutral-900">
      <div
        className="h-5 rounded bg-green-400"
        style={{ width: `${completedPercentage}%` }}
      />
    </div>
  );
};
