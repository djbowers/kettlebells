import { Duration } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

export const useTimer = (
  /** Time to start counting down from in minutes */
  initialTimer: number,
) => {
  const [seconds, setSeconds] = useState<number>(initialTimer * 60);
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [paused]);

  const reset = useCallback(() => setSeconds(initialTimer), []);
  const togglePause = useCallback(() => setPaused((prev) => !prev), []);

  const timeRemaining = Duration.fromObject({ seconds }).toFormat('m:ss');

  return [timeRemaining, { reset, seconds, togglePause, paused }] as const;
};
