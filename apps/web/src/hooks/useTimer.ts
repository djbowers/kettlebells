import { Duration } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

export const useTimer = (
  /** Time to start counting down from in minutes */
  initialTimer: number,
): [
  string,
  { reset: () => void; seconds: number; togglePause: () => void },
] => {
  const [seconds, setSeconds] = useState<number>(initialTimer * 60);
  const [skip, setSkip] = useState<boolean>(false);

  useEffect(() => {
    if (skip) return;

    const timer = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [skip]);

  const reset = useCallback(() => setSeconds(initialTimer), []);
  const togglePause = useCallback(() => setSkip((prev) => !prev), []);

  const timeRemaining = Duration.fromObject({ seconds }).toFormat('m:ss');

  return [timeRemaining, { reset, seconds, togglePause }];
};
