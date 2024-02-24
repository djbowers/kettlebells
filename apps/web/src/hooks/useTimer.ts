import { Duration } from 'luxon';
import { useCallback, useEffect, useState } from 'react';

export const useTimer = (
  /** Time to start counting down from in minutes */
  initialTimer: number,
) => {
  const [milliseconds, setMilliseconds] = useState<number>(
    initialTimer * 60000,
  );
  const [paused, setPaused] = useState<boolean>(false);

  useEffect(() => {
    if (paused || initialTimer === 0) return;

    const timer = setInterval(() => {
      setMilliseconds((s) => s - 100);
    }, 100);
    return () => clearInterval(timer);
  }, [paused]);

  const reset = useCallback(() => setMilliseconds(initialTimer), []);
  const togglePause = useCallback(() => setPaused((prev) => !prev), []);

  const timeRemaining = Duration.fromObject({
    milliseconds,
  })
    .toFormat('m:ss')
    .toString();

  return [timeRemaining, { reset, milliseconds, togglePause, paused }] as const;
};
