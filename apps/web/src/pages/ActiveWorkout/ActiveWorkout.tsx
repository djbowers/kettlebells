import { PlayPauseIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/components';
import { useSession } from '~/contexts';
import { useTimer } from '~/hooks';
import { supabase } from '~/supabaseClient';

export interface WorkoutOptions {
  task: string;
  reps: number;
  notes: string;
  minutes: number;
}

interface Props {
  startedAt: Date;
  workoutOptions: WorkoutOptions;
}

export const ActiveWorkout = ({
  startedAt,
  workoutOptions: { task, reps, notes, minutes },
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
    const { error } = await supabase.from('workout_history').insert({
      started_at: startedAt.toISOString(),
      completed_at: new Date().toISOString(),
      user_id: user.id,
      task,
      notes,
      minutes,
      reps_per_round: reps,
      completed_rounds: completedRounds,
    });
    if (error) console.error(error);
    else navigate('/history');
  };

  return (
    <div className="flex flex-col mt-2 space-y-4">
      <Progress completedPercentage={completedPercentage} />

      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-center">
          <div className="font-medium text-2xl">
            {task} <span className="text-lg text-gray-500">{notes}</span>
          </div>
          <div>{timeRemaining}</div>
        </div>

        <Button
          className="border border-gray-700 w-full flex justify-center items-center py-1 rounded"
          onClick={handleClickPlayPause}
        >
          <PlayPauseIcon className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex flex-col space-y-3 justify-center items-center py-4">
        <div className="font-medium text-2xl">Round {currentRound}</div>
        <div className="text-6xl font-medium">
          {reps} <span className="text-2xl">reps</span>
        </div>
        <Button
          className="w-full bg-blue-500 flex items-center justify-center rounded py-1"
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
          className="border border-gray-700 w-full flex justify-center items-center py-1 rounded"
          onClick={handleClickFinish}
        >
          <div>FINISH WORKOUT</div>
        </Button>
      </div>
    </div>
  );
};

const Progress = ({ completedPercentage }: { completedPercentage: number }) => {
  return (
    <div className="w-full bg-neutral-900 rounded h-5">
      <div
        className="bg-green-400 h-5 rounded"
        style={{ width: `${completedPercentage}%` }}
      />
    </div>
  );
};
